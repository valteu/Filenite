import os
import subprocess
import sys

def run_command(command, cwd=None):
    """
    Run a shell command in a specified directory and print the output.
    """
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, cwd=cwd)
    while True:
        output = process.stdout.readline()
        if not output and process.poll() is not None:
            break
        if output:
            print(output.strip().decode())

def install_frontend_dependencies():
    """
    Install frontend JavaScript dependencies using npm.
    """
    print("Navigating to the frontend directory...")
    os.chdir('/client')

    print("Installing frontend dependencies using npm...")
    run_command('npm install')

def install_backend_dependencies():
    """
    Set up a Python virtual environment and install backend dependencies.
    """
    print("Navigating to the backend directory...")
    os.chdir('/server')

    if not os.path.exists('venv'):
        print("Setting up Python virtual environment...")
        run_command('python3 -m venv venv')

    print("Activating the virtual environment and installing backend dependencies...")
    if sys.platform == "win32":
        # Windows requires a different command to activate the virtual environment
        run_command('.\\venv\\Scripts\\activate && pip install -r requirements.txt')
    else:
        # Linux and macOS use this command
        run_command('source venv/bin/activate && pip install -r requirements.txt')

    print("Dependencies installed successfully.")

def main():
    install_frontend_dependencies()
    install_backend_dependencies()

if __name__ == "__main__":
    main()
