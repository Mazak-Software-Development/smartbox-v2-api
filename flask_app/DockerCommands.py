import docker
import os
from pathlib import Path
import logging
import socket
import pdb
import shutil

logging.basicConfig(level=logging.INFO)

client = docker.from_env()

root_dir = Path(__file__).parent  # Path to the root directory flask_app
agent_dir = Path("/srv/smartbox-api/agents")  # Path to the agent directory
agent_dir.mkdir(parents=True, exist_ok=True)  # Create the agent directory if it does not exist

PORT_RANGE = (5000, 5010)


def get_existing_container(client, name):
    try:
        return client.containers.get(name)
    except docker.errors.NotFound:
        return None


def build_or_get_image():
    try:
        image = client.images.get("mtconnect-agent")
        logging.info("Image found locally.")
    except docker.errors.ImageNotFound:
        logging.info("Image not found, building now...")
        image, _ = client.images.build(path="agent", dockerfile="Dockerfile.agent", tag="mtconnect-agent", rm=True)
    return image


class ContainerError(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message


def run_container(image, agent_name, port):
    existing_container = get_existing_container(client, agent_name)
    if existing_container:
        logging.info(f"Container '{agent_name}' already exists. Consider stopping/removing it before proceeding.")
        raise ContainerError(f"Container '{agent_name}' already exists. Consider stopping/removing it before proceeding.")

    local_path = agent_dir / agent_name  # Path to the agent directory

    if local_path.exists():  # Check if the agent directory exists
        logging.info(f"Agent '{agent_name}' already exists. Consider removing it before proceeding.")
        raise ContainerError(f"Agent '{agent_name}' already exists. Consider removing it before proceeding.")

    local_path.mkdir(parents=True)  # Create the agent directory if it does not exist

    target = root_dir / "agent" / "default"
    logging.info(f"Copying files from {target} to {local_path} in container {agent_name}...")

    shutil.copytree(root_dir / "agent" / "default", local_path, dirs_exist_ok=True)

    # For testing on Windows
    username = "momoore"
    host_machine_path = Path(f"C:\\Users\\{username}\\Documents\\smartbox-api\\agents" , agent_name)

    logging.info(f"Host machine path: {host_machine_path}")
    logging.info(f"agent path: {agent_name}")
    agent_port = port

    container = client.containers.run(image, detach=True, ports={5000: agent_port},
                                      volumes={f"{host_machine_path}": {"bind": "/app/agent", "mode": "rw"}},
                                      # Mount the agent directory to the container
                                      name=agent_name)
    logging.info(f"Container '{agent_name}' started.")

    return container


def delete_container(name):
    try:
        container = client.containers.get(name)
        container.stop()
        container.remove()

        delete_local_directory(name)
        # delete_mounts(container)
    except docker.errors.APIError as e:
        logging.info(f"Container '{name}' did not get removed. Error: {e}.")
        raise ContainerError(f"Container '{name}' did not get removed. Error: {e}.")
    except docker.errors.NotFound as e:
        logging.info(f"Container '{name}' does not exists. Try again Error: {e}.")
        raise ContainerError(f"Container '{name}' does not exists. Try again Error: {e}.")
    except FileNotFoundError as e:
        logging.info(f"Directory '{name}' does not exists")
        raise ContainerError(f"Directory '{name}' does not exist")
    except Exception as e:
        logging.error(f"Error while deleting container '{name}. {e}")
        raise ContainerError(f"Error while deleting container '{name}. {e}")
    logging.info("Container successfully removed")


def delete_local_directory(name):
    """
    Deletes the agent folder and its contents. Used when removing an agent.
    :param name: The name of the agent
    :return: None
    """
    directory = agent_dir / name
    shutil.rmtree(directory)


def delete_mounts(container):
    mounts = container.attrs['Mounts']
    for mount in mounts:
        volume_name = mount["Name"]
        try:
            volume = client.volumes.get(volume_name)
            volume.remove()
        except docker.errors.NotFound as e:
            logging.info(f"Volume '{volume_name}' does not exists. Try again Error: {e}.")
            return
        except docker.errors.APIError as e:
            logging.info(f"Volume '{volume_name}' did not get removed. Container Error: {e}.")
            return


# def replace_agent_config(file, agent_name):
#     container = client.containers.get(agent_name)

#     volumes = client.volumes.list()
#     for volume in volumes:
#         print(volume.name)
#         print(volume.attrs)


# TODO: Find a way to make a read function that will read different files from the agent container

def read_file(file, agent_name):
    container = client.containers.get(agent_name)
    exec_command = f"cat /mtconnect/config/{file}" if file in ["agent.cfg",
                                                               "mazak.xml"] else f"cat /mtconnect/log/{file}"
    # command to read the file
    result = container.exec_run(exec_command, stderr=True, stdout=True, stream=False)
    if result.exit_code == 0:  # if the result exit code is 0, then the command was successful
        return result.output.decode('utf-8')  # decoding the byte output to string
    else:
        logging.error(f"Error reading file: {file} from {agent_name}, exit code: {result.exit_code}")
        return f"Error executing command: {exec_command}, exit code: {result.exit_code}"


# TODO: make a mass create function that will run when the flask app starts up (10 agents)

def make_multiple_containers(image, agent_name, port, number):
    for numbers in range(number):
        try:
            if is_port_in_use(port + numbers):
                logging.info(f"Port {port + numbers} is in use. Try again.")
                return False, port + numbers
            run_container(image, agent_name + str(numbers), port + numbers)
        except docker.errors.APIError as e:
            logging.info(f"Container '{agent_name + str(numbers)}' did not start. Error: {e}.")
    return True, port + numbers


def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0


def stop_container(agent_name):
    container = client.containers.get(agent_name)
    container.stop()


def start_container(agent_name):
    container = client.containers.get(agent_name)
    container.start()


# TODO: make a function that will upload a new agent.cfg or mazak.xml to a container
# ?
def upload_file(file, agent_name):
    container = client.containers.get(agent_name)
    if file.filename in ["agent.cfg", "mazak.xml"]:
        container.put_archive("/mtconnect/config", data=file)


# ?


if __name__ == "__main__":
    image = build_or_get_image()
    run_container(image)
