import docker
from pathlib import Path
import logging
import os
import shutil
from app.utils import is_port_in_use
from app.config import settings
import dotenv


client = docker.from_env()


class ContainerError(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message


root_dir = Path(__file__).parent  # Path to the root directory flask_app
PORT_RANGE = (5000, 5010)


def get_existing_container(name):
    try:
        return client.containers.get(name)
    except docker.errors.NotFound:
        return None
    
def check_container_status(name):
    try:
        container = client.containers.get(name)
        return container.status
    except docker.errors.NotFound:
        return ContainerError(f"Container '{name}' does not exist.")

# def build_or_get_image():
#     try:
#         image = client.images.get("mtconnect-agent")
#         logging.info("Image found locally.")
#     except docker.errors.ImageNotFound:
#         logging.info("Image not found, building now...")
#         image, _ = client.images.build(path="/app", dockerfile="Dockerfile.agent", tag="mtconnect-agent", rm=True)
#         logging.info("after the image is built")
#     return image



#! remove image from argument
def run_container(image, agent_name, port):
    existing_container = get_existing_container(agent_name)
    if existing_container:
        logging.info(f"Container '{agent_name}' already exists. Consider stopping/removing it before proceeding.")
        raise ContainerError(f"Container '{agent_name}' already exists. Consider stopping/removing it before proceeding.")

    dst = settings.docker_agent_dir / agent_name  # Path to the agent directory

    if dst.exists():  # Check if the agent directory exists
        logging.info(f"Agent '{agent_name}' already exists. Consider removing it before proceeding.")
        raise ContainerError(f"Agent '{agent_name}' already exists. Consider removing it before proceeding.")

    dst.mkdir(parents=True)  # Create the agent directory if it does not exist

    src = Path(__file__).parent / "config" / "agent"
    logging.info(f"Copying files from {src} to {dst} in container {agent_name}...")

    shutil.copytree(src=src, dst=dst, dirs_exist_ok=True)

    host_agent_path = settings.agent_dir /  agent_name # path to the local machine used to get the agent.cfg for the agent

    agent_port = port

    agent_command = ["/usr/bin/mtcagent", "run", "/app/agent/agent.cfg"]

    container = client.containers.run(image, restart_policy={"Name": "unless-stopped"}, detach=True, ports={5000: agent_port},
                                      volumes={f"{host_agent_path}": {"bind": "/app/agent", "mode": "rw"}},
                                      name=agent_name, command=agent_command, user="root")
    
    logging.info(f"Container '{agent_name}' started.")

    return container


def delete_container(name):
    try:
        container = client.containers.get(name)
        container.stop()
        container.remove(v=True) #* This argument will remove the need for delete_mounts function. Needs testing
        delete_local_directory(name)
        # delete_mounts(container)
    except docker.errors.APIError as e:
        logging.info(f"Error communicating with Docker client. Container '{name}' did not get removed.")
        raise ContainerError
    except docker.errors.NotFound as e:
        logging.info(f"Container '{name}' does not exists.")
        raise ContainerError
    except Exception as e:
        logging.error(f"Error while deleting container '{name}. {e}")
        raise Exception
    logging.info("Container successfully removed")


def delete_local_directory(name):
    """
    Deletes the agent folder and its contents. Used when removing an agent.
    :param name: The name of the agent
    :return: None
    """
    directory = settings.docker_agent_dir / name
    shutil.rmtree(directory)


dotenv_file = dotenv.find_dotenv(filename="app/app/config/.env.development")
dotenv.load_dotenv(dotenv_file)

# TODO: make a mass create function that will run when the flask app starts up (10 agents)
def make_ten_agents(image, agent_name, port):
    startup = initial_startup()
    logging.info(f"startup env is: {startup}")
    if startup:
        logging.info("10 agents already exsist")
    else:    
        for i in range(1, 11):
            try:
                run_container(image, agent_name + str(i), port + i)
            except docker.errors.APIError as e:
                logging.info(f"Container '{agent_name + str(i)}' did not start. Error: {e}.")
            logging.info(f"Container '{agent_name + str(i)}' started.")
        os.environ['INITIAL_STARTUP'] = 'TRUE'
        dotenv.set_key(dotenv_file, 'INITIAL_STARTUP', os.environ["INITIAL_STARTUP"])
    logging.info(f"The ENV variaable is {os.getenv('INITIAL_STARTUP')}")


def initial_startup():
    env = check_env()
    if env:
        logging.info("Initial startup has already been complete. Checking for 10 agents")
        for i in range(1, 11):
            try:
                client.containers.get("MC"+ str(i))
            except docker.errors.NotFound as e:
                logging.error(f"Error finding agents: {e}")
        return True
    else:
        logging.info("Inital Startup is false, creating 10 agents")
        return False
        

def check_env():
    test = os.getenv("INITIAL_STARTUP")
    logging.info(f"{test}") 
    if test == "TRUE":
        return True
    else:
        return False


if __name__ == "__main__":
    print("Running docker_utils.py")
    # image = build_or_get_image()
    # run_container(image)

