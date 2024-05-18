import importlib
import subprocess
import sys


def is_docker_installed():
    try:
        # Run a Docker-related command and capture the output
        result = subprocess.run(['docker', '--version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # Check the return status
        if result.returncode == 0:
            print("Docker is installed.")
            return True
        else:
            print("Docker is not installed.Kindly, install it first.")
            sys.exit(1)
            return False
    except FileNotFoundError:
        print("Docker is not installed.")
        return False
is_docker_installed()

def install_module(module_name):
    """Install a Python module using pip."""
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", module_name], check=True)
        print(f"Successfully installed {module_name}.")
    except subprocess.CalledProcessError:
        print(f"Error: Failed to install {module_name}.")
        sys.exit(1)

def check_module():
    """Check if a Python module is installed."""
    print("Checking availability of dependencies...")
    modules=['platform','time','hashlib','os','simple_term_menu','tkinter','shutil','docker']
    for module_name in modules:
        try:
            importlib.import_module(module_name)
            # print(f"{module_name} is already installed.")
        except ImportError:
            print(f"{module_name} is not installed. Installing...")
            install_module(module_name)
    print("All dependencies are available.")
check_module()




import platform
import time
import hashlib
import os
from simple_term_menu import TerminalMenu
import tkinter as tk
from tkinter import filedialog
import shutil
import docker



def hash_current_time():
    """Hash the current time using SHA-256 algorithm."""
    current_time = str(time.time())  # Get current time as a string
    sha256_hash = hashlib.sha256(current_time.encode()).hexdigest()  # Hash the string using SHA-256
    return sha256_hash


hashed_time=hash_current_time()[:4]
mysql_root_password = "your_mysql_root_password"
mysql_database = "your_mysql_database"
mysql_user = input('Enter the mysql user(Default:mysql_user ): ').strip() or "mysql_user"
mysql_password = input('Enter the mysql user password(Default:mysql_password): ').strip() or "mysql_password"
mysql_container_name = "mysqlscript"
phpmyadmin_container_name = "phpmyadminscript"
phpmyadmin_port = 8080
network_name = "php_mysql_network_script" 
file_path="./assest/"
work_path="./assest/"
dockerfile_path="./assest/"
php_script=""
inputFile=""
php_container_name = "php_mysql_container_script" 
table_name=input('Enter the tablename'+f"(Default:table{hashed_time}):").strip() or "table"+hashed_time
input_file_path=""

def create_file(file_path, content=None,edit=False):
    """Create a file if it doesn't exist and write content to it."""
    directory = os.path.dirname(file_path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Directory '{directory}' created successfully.")
    if(not content==None):
        if edit or not os.path.exists(file_path):
            with open(file_path, 'w') as file:
                if content:
                    file.write(content)
                print(f"File '{file_path}' created successfully.")
        else:
            print(f"File '{file_path}' already exists.")

def select_and_copy_file():
    root = tk.Tk()
    root.withdraw()  # Hide the main window

    file_path_t = filedialog.askopenfilename()  # Open a file dialog and return the selected file path
    global inputFile
    global input_file_path
    create_file("./assest/")
    if file_path_t:  # If a file is selected
        file_name = file_path_t.split("/")[-1]  # Extract the file name from the file path
        destination_path = work_path  + file_name  # Construct the destination path
        inputFile=file_name
        # print(destination_path)
        input_file_path=destination_path
        shutil.copy(file_path_t, destination_path)  # Copy the file to the destination folder



def select_service():
    global file_path
    global php_script
    services = ["xml converter", "json converter", "csv converter"]
    terminal_menu = TerminalMenu(services, title="Select the service: ")
    menu_entry_index = terminal_menu.show()
    print(f"You have selected {services[menu_entry_index]}!")
    if(services[menu_entry_index]=="xml converter"):
        php_script="xml.php"
        file_content='''<?php
                // MySQL server configuration
                $servername = "'''+mysql_container_name+'''"; // Use the MySQL container name here
                $username = "'''+mysql_user+'''";
                $password = "'''+mysql_password+'''";
                $database = "'''+mysql_database+'''";

                // Create connection
                $conn = new mysqli($servername, $username, $password, $database);

                // Check connection
                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }

                $affectedRow = 0;

                // Load xml file else check connection
                $sql="CREATE TABLE '''+table_name+'''(
                    title varchar(255),
                    link varchar(1000),
                    description varchar(1000),
                    keywords varchar(255)
                )";
                $result = mysqli_query($conn, $sql);
                
                $xml = simplexml_load_file("'''+inputFile+'''") 
                    or die("Error: Cannot create object");

                
                // Assign values
                foreach ($xml->children() as $row) {
                    $title = $row->title;
                    $link = $row->link;
                    $description = $row->description;
                    $keywords = $row->keywords;
                    
                    // SQL query to insert data into xml table
                    $sql = "INSERT INTO '''+table_name+'''(title, link, 
                        description, keywords) VALUES ('" 
                        . $title . "','" . $link . "','"
                        . $description . "','" . $keywords . "')";
                    
                    $result = mysqli_query($conn, $sql);
                    
                    if (! empty($result)) {
                        $affectedRow ++;
                    } else {
                        $error_message = mysqli_error($conn) . "\n";
                    }
                }
                ?>

                <center><h2>XML TO RDBMS CONVERTER</h2></center>
                <center><h1>XML Data storing in Database</h1></center>
                <?php
                if ($affectedRow > 0) {
                    $message = $affectedRow . " records inserted";
                } else {
                    $message = "No records inserted";
                }

                ?>
                <style>
                    body { 
                        max-width:550px;
                        font-family: Arial;
                    }
                    .affected-row {
                        background: #cae4ca;
                        padding: 10px;
                        margin-bottom: 20px;
                        border: #bdd6bd 1px solid;
                        border-radius: 2px;
                        color: #6e716e;
                    }
                    .error-message {
                        background: #eac0c0;
                        padding: 10px;
                        margin-bottom: 20px;
                        border: #dab2b2 1px solid;
                        border-radius: 2px;
                        color: #5d5b5b;
                    }
                </style>

                <div class="affected-row">
                    <?php echo $message; ?>
                </div>

                <?php if (! empty($error_message)) { ?>

                <div class="error-message">
                    <?php echo nl2br($error_message); ?>
                </div>
                <?php } ?>
            '''
        file_path=file_path+php_script
        create_file(file_path, file_content,True)
    elif(services[menu_entry_index]=="json converter"):
        php_script="json.php"
        file_content='''
                    <?php
                    $servername = "'''+mysql_container_name+'''"; // Use the MySQL container name here
                $username = "'''+mysql_user+'''";
                $password = "'''+mysql_password+'''";
                $database = "'''+mysql_database+'''";
                    $conn = new mysqli($servername, $username, $password,$database);


                    //Connection
                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    }
                    echo "Connected successfully";


                    //File read
                    $jsonData = file_get_contents("'''+inputFile+'''");
                    $data = json_decode($jsonData, true);

                    if ($data === null) {
                        die("Error decoding JSON data");
                    }

                    // Get keys for table columns
                    $keys = array_keys($data[0]);




                    $regex="/^[a-zA-Z_][a-zA-Z0-9_]*$/";


                    // Generate table creation query
                    $tableName = "'''+table_name+'''"; // You can change the table name here


                    $tableCreateQuery = "CREATE TABLE $tableName (";
                    $x=0;
                    foreach ($keys as $key) {
                        if(preg_match($regex, $key)==1)
                        {
                            $tableCreateQuery .= "$key VARCHAR(255), ";
                        }
                        else
                        {
                            $tableCreateQuery .= "ColumnNo".$x." VARCHAR(255), ";
                        
                        }
                    $x++;
                    }
                    $tableCreateQuery = rtrim($tableCreateQuery, ", ");
                    $tableCreateQuery .= ")";

                    //Creating Table query
                    if ($conn->query($tableCreateQuery) === TRUE) {
                        echo "New record created successfully \n";
                    } else {
                        echo "Error: " . $tableCreateQuery . "<br>" . $conn->error;
                    }

                    // creating insert query
                    foreach ($data as $row) {
                        $insertQuery = "INSERT INTO $tableName ";
                        $values = "";
                        foreach ($keys as $key) {
                            $values .= "'" . $row[$key] . "', ";
                        }
                        $insertQuery = rtrim($insertQuery, ", ") . " VALUES (" . rtrim($values, ", ") . ")";
                    
                        if ($conn->query($insertQuery) === TRUE) {
                            echo "New record created successfully \n";
                    } else {
                        echo "Error: " . $insertQuery . "<br>" . $conn->error;
                        break;
                    }
                    }

                    ?>'''
        file_path=file_path+php_script
        create_file(file_path, file_content,True)
    elif(services[menu_entry_index]=="csv converter"):
        php_script="csv.php"
        file_content='''
                    <?php
                $servername = "'''+mysql_container_name+'''"; // Use the MySQL container name here
                $username = "'''+mysql_user+'''";
                $password = "'''+mysql_password+'''";
                $database = "'''+mysql_database+'''";
                    $conn = new mysqli($servername, $username, $password,$database);


                    //Connection
                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    }
                    echo "Connected successfully";


                    //File read
                    if (($open = fopen("'''+inputFile+'''", "r")) !== FALSE)
                    // table name
                    $table_name="'''+table_name+'''";


                    $regex="/^[a-zA-Z_][a-zA-Z0-9_]*$/";
                    {
                    $first_time=true;//check for first time for adding columns
                        while (($data = fgetcsv($open, 1000, ",")) !== FALSE)
                        {		
                            if($first_time==true){//Code to create table
                            $temp_query="";
                            $data_type=" varchar(255)";
                            $data_sql="INSERT INTO $table_name(";
                                $column=count($data);
                                $index=0;
                                for ($x = 0; $x < $column; $x++) {
                                if($data[$x]!="")
                                {
                                    if(preg_match($regex, $data[$x])==1)
                                    {
                                    $temp_query=$temp_query.$data[$x].$data_type; //query for creating columns and table
                                    $data_sql=$data_sql."`".$data[$x]."`";//for generating data entry query for column name
                                    }
                                    else
                                    {
                                    $temp_query=$temp_query."ColumnNo".$x.$data_type; //query for creating columns and table
                                    $data_sql=$data_sql."`"."ColumnNo".$x."`";//for generating data entry query for column name
                                    }
                                
                                }
                                else
                                {
                                    $temp_query=$temp_query."Temp_Value".$x.$data_type; //If column name is empty
                                }

                                
                                if(($x+1)<$column){// adding commas between query
                                    $temp_query=$temp_query.",";
                                    $data_sql=$data_sql.",";
                                }
                                
                                }
                            
                                $sql="CREATE TABLE ".$table_name."(".$temp_query.")";
                                if ($conn->query($sql) === TRUE) {
                                echo "Table Created Successfully! \n";
                            } else {
                                echo "Error: " . $sql . "<br>" . $conn->error;
                            }
                                $first_time=false;
                                $data_sql=$data_sql.") VALUES (";
                            }
                                else{
                                    $temp_sql=$data_sql;
                                    for ($x = 0; $x < $column; $x++) {
                                    $temp_sql=$temp_sql.'"'.$data[$x].'"';
                                    if(($x+1)<$column){
                                        $temp_sql=$temp_sql.",";
                                    }
                                    
                                    }
                                    $temp_sql=$temp_sql.")";
                                    
                                    if ($conn->query($temp_sql) === TRUE) {
                                        echo "New record created successfully \n";
                                    } else {
                                    echo "Error: " . $temp_sql . "<br>" . $conn->error;
                                    break;
                                    }

                                }

                        }
                    echo "Success \n";

                        fclose($open);
                    }

                    ?>
                    '''
        file_path=file_path+php_script
        create_file(file_path, file_content,True)


def install_docker():
    """Install Docker based on the operating system."""
    if platform.system() == "Windows":
        # Install Docker Desktop using Chocolatey on Windows
        subprocess.run(["choco", "install", "docker-desktop", "-y"], check=True)
        print("Docker Desktop installed successfully.")
    elif platform.system() in ["Linux", "Darwin"]:
        # For Unix-like systems, do nothing as Docker installation varies
        print("Docker installation instructions for Unix-like systems: https://docs.docker.com/get-docker/")
    else:
        print("Error: Unsupported operating system.")
        sys.exit(1)

def create_network():
    """Create a Docker network."""
    try:
        subprocess.run(["docker", "network", "create", network_name], check=True)
        print(f"Docker network '{network_name}' created successfully.")
    except subprocess.CalledProcessError:
        print("Error: Failed to create Docker network.")
        # sys.exit(1)

def start_containers():
    """Start MySQL and phpMyAdmin containers."""
    

    # Start MySQL container
    try:
        subprocess.run([
            "docker", "run", "-d",
            "--name", mysql_container_name,
            "--network", network_name,
            "-e", f"MYSQL_ROOT_PASSWORD={mysql_root_password}",
            "-e", f"MYSQL_DATABASE={mysql_database}",
            "-e", f"MYSQL_USER={mysql_user}",
            "-e", f"MYSQL_PASSWORD={mysql_password}",
            "mysql:latest"
        ], check=True)
        print("MySQL container started successfully.")
    except subprocess.CalledProcessError:
        try:
            client = docker.from_env()
            container = client.containers.get(mysql_container_name)
            if container.status != 'running':
                container.start()
                print(f"Container '{mysql_container_name}' started successfully.")
            else:
                print(f"Container '{mysql_container_name}' is already running.")
        except:
            print("Error: Failed to start MySQL container.")
        # sys.exit(1)

    # Start phpMyAdmin container
    try:
        subprocess.run([
            "docker", "run", "-d",
            "--name", phpmyadmin_container_name,
            "--network", network_name,
            "-e", "PMA_ARBITRARY=1",
            "-p", f"{phpmyadmin_port}:80",
            "phpmyadmin/phpmyadmin"
        ], check=True)
        print("phpMyAdmin container started successfully.")
    except subprocess.CalledProcessError:
        try:
            client = docker.from_env()
            container = client.containers.get(phpmyadmin_container_name)
            if container.status != 'running':
                container.start()
                print(f"Container '{phpmyadmin_container_name}' started successfully.")
            else:
                print(f"Container '{phpmyadmin_container_name}' is already running.")
        except:
            print("Error: Failed to start phpMyAdmin container.")
        # sys.exit(1)

def wait_for_mysql():
    """Wait for MySQL to initialize."""
    print("Waiting for MySQL to initialize...")
    time.sleep(10)  # Wait for 10 seconds


def create_docker_file():
    file_content=f'''FROM php:latest
RUN apt-get update && apt-get install -y \
default-mysql-client \
&& docker-php-ext-install mysqli pdo pdo_mysql

# Set the working directory inside the container
WORKDIR /scripts

# Copy the PHP script into the container
COPY {work_path} /scripts/'''
    create_file(dockerfile_path+"Dockerfile",file_content,True)


def build_docker_image():
    """Build Docker image with PHP and MySQL client."""
    try:
        subprocess.run(["docker", "build", "-t", "php_mysql_image", "-f", dockerfile_path+"Dockerfile", '.'], check=True)
        print("Docker image built successfully.")
    except subprocess.CalledProcessError:
        print("Error: Failed to build Docker image.")
        # sys.exit(1)

def run_php_script():
    """Run PHP script inside the Docker container."""
    

    try:
        subprocess.run([
            "docker", "run", "--rm",
            "--name", php_container_name,
            "--network", network_name,
            "php_mysql_image", "php", f"/scripts/{php_script}"
        ], check=True)
    except subprocess.CalledProcessError:
        print("Error: Failed to run PHP script inside Docker container.")
        # sys.exit(1)

def cleanup():
    """Stop containers and remove network."""
    color_code='96'
    colored_text = f"\033[{color_code}m{'mysqlscript'}\033[0m"  # Add color to the text
    print('\n')
    print("PHPMyAdmin running on: ")
    print(f"URL: \033[{color_code}m{'http://localhost:8080/'}\033[0m")  # Print the URL in color
    print(f"Server: {colored_text}")
    print('\n')
    do_clean = input('Do you want to clean the docker containers and networks?Proceed (Y/n)? (Default:n ): ').strip() or "n"
    if(do_clean=='Y' or do_clean=='y'):
        # Stop MySQL container
        subprocess.run(["docker", "stop", mysql_container_name])
        client = docker.from_env()
        container = client.containers.get(mysql_container_name)
        container.remove(force=True)

        # Stop phpMyAdmin container
        subprocess.run(["docker", "stop", phpmyadmin_container_name])
        client = docker.from_env()
        container = client.containers.get(phpmyadmin_container_name)
        container.remove(force=True)

        # Remove Docker network
        subprocess.run(["docker", "network", "rm", network_name])
    os.remove(file_path)
    os.remove(input_file_path)


if __name__ == "__main__":
    select_and_copy_file()
    select_service()

    create_network()
    start_containers()
    wait_for_mysql()
    create_docker_file()

    build_docker_image()
    run_php_script()
    cleanup()
