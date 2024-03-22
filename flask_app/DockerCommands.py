import docker
from pathlib import Path
import logging
import socket
import pdb

logging.basicConfig(level=logging.INFO)

client = docker.from_env()

root_dir = Path(__file__).parents[1]
agent_dir = root_dir / "agents"
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
        image, _ = client.images.build(path="Create", dockerfile="Dockerfile", tag="mtconnect-agent", rm=True)
    return image


def run_container(image, agent_name, port):
    existing_container = get_existing_container(client, agent_name)
    if existing_container:
        logging.info(f"Container '{agent_name}' already exists. Consider stopping/removing it before proceeding.")
        return
    volume_name = agent_name
    volume_name_config = volume_name + "-config"
    volume_name_data = volume_name + "-data"
    volume_name_log = volume_name + "-log"

    # test = client.volumes.list()
    # print(test[0].__dict__.keys())

    existing_volumes = [volume.name for volume in client.volumes.list()]
    print(existing_volumes)
    try:    
        for volume in existing_volumes:
            if volume in [volume_name_log, volume_name_config, volume_name_data]:    
                # print(volume_name_log, volume_name_config, volume_name_data)
                raise ValueError
    except ValueError:
        logging.info(f"Volume '{volume_name}' already exists. Try again")
        return

    agent_port = port
    container = client.containers.run(image, detach=True, ports={5000:agent_port},
                                      volumes={f"{volume_name_config}": {"bind": "/mtconnect/config", "mode": "rw"}, f"{volume_name_data}": {"bind": "/mtconnect/data", "mode": "rw"}, f"{volume_name_log}": {"bind": "/mtconnect/log", "mode": "rw"}},
                                      name=agent_name)
    logging.info(f"Container '{agent_name}' started.")
    return container


def delete_container(name):
    try:
        container = client.containers.get(name)
        container.stop()
        container.remove()
    except docker.errors.APIError as e:
            logging.info(f"Container '{name}' did not get removed. Error: {e}.")
            return
    except docker.errors.NotFound as e:
        logging.info(f"Container '{name}' does not exists. Try again Error: {e}.")
        return
    logging.info(("Container successfully removed"))

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
    if file in ["agent.cfg", "mazak.xml"]:
        output = container.exec_run(f"cat -b /mtconnect/config/{file}")
    elif file in ["agent.log"]:
        output = container.exec_run(f"cat -v -e /mtconnect/log/{file}")
    return output
    
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
#?   
def upload_file(file, agent_name):
    container = client.containers.get(agent_name)
    if file.filename in ["agent.cfg", "mazak.xml"]:
        container.put_archive("/mtconnect/config", data=file)
#?
        

if __name__ == "__main__":
    image = build_or_get_image()
    run_container(image)




    # not working async
#     async def get_available_ports(port_range):
#     available_ports = []
#     tasks = []
#     start_port, end_port = port_range
#     for port in range(start_port, end_port + 1):
#         task = asyncio.create_task(check_port(port))
#         tasks.append(task)

#     results = await asyncio.gather(*tasks)
#     for result in results:
#         port, status = result
#         if status == False:
#              available_ports.append(port)

#     return available_ports

# async def check_port(port):
#     with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
#         status =  s.connect_ex(('localhost', port)) == 0
#         return (port, status)

# def get_min_port():
#     ports = asyncio.run(get_available_ports(PORT_RANGE))
#     min_port = min(ports)
#     return min_port
        

        # working sync
    
    # def get_available_ports(port_range):
#     available_ports = []
#     start_port, end_port = port_range
#     for port in range(start_port, end_port + 1):
#         status = is_port_in_use(port)
#         if not status:
#             available_ports.append(port)
            
#     return available_ports

# def is_port_in_use(port):
#     with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
#         return s.connect_ex(('localhost', port)) == 0

# def get_min_port():
#     ports = get_available_ports(PORT_RANGE)
#     min_port = min(ports)
#     return min_port
        