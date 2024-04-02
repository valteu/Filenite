from start_server import start_server
from start_client import start_client
import threading

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server)
    client_thread = threading.Thread(target=start_client)

    server_thread.start()
    client_thread.start()

    server_thread.join()
    client_thread.join()
