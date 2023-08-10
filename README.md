# Grid Management System - Web App
## IoT class system of electricity management based on a cloud interface
The project involves the design and development of a device that allows remote control the power supply of the connected receiver. Powering the receiver on and off should be possible on demand, after a certain period of time, during designated periods. In addition, the device will conduct measurements of voltage and current and count the energy used (Smart Socket). The second part of the project is creation of a web application to manage the device and present statistics. Communication with the device and data storage will be possible through a configured cloud service.
## Technologies
* TypeScript
* JavaScript
* ReactJS
* React Router
* IBM Carbon
* Axios
* Sequelize
## Features
* Login / Create account
* Add GMS device
* Monitor devices data
* Manage devices
* Light / dark theme
## System architecture
![architecture](https://github.com/wybieracz/GMS-Firmware/blob/main/diagram/Architektura.png)
The solution consists of six major components:
* IoT Device - smart device able to work in GMS. [(Device)](https://github.com/wybieracz/GMS-Firmware)
* Azure IoT Hub - a managed cloud service that acts as a central message hub for communication between an IoT application and its attached devices.
* Azure Stream Analytics - cloud service that provides real-time analytic computations on the data streaming from IoT devices.
* Azure Database for PostgreSQL - Database used to store devices telemetry and web app data.
* Azure App Service - Web app used for device manipulation and telemetry presentation.
* Azure Storage Accounts - Web app used for device manipulation and telemetry presentation.
## Getting started
1. Install Node.js and Docker.
2. Create account on [Microsoft Azure](https://azure.microsoft.com/en-gb/).
3. Create Azure Database for Postgres, Azure IoT Hub, Azure Stream Analytics according to the [instructions](https://github.com/wybieracz/GMS-Firmware).
4. Clone repository.
5. In `szee_backend` create `.env` file and fill with proper data:
```
NODE_ENV='dev'
APP_PORT='8000'
DB_HOST='[name].postgres.database.azure.com'
DB_PORT='5432'
DB_USER='[db_username]'
DB_PASS='[db_password]'
DB_DIALECT='postgres'
DB_NAME='[db_name]'
HASH_SALT='[salt]'
JWT_KEY='[jwt_key]'
TOKEN_EXPIRATION='2h'
IOT_HUB='https://[iot_hub_name].azure-devices.net/twins/'
API_VERSION='api-version=2020-09-30'
IOT_SAS='SharedAccessSignature sr=[iot_hub_name].azure-devices.net&[...]&skn=iothubowner'
```
6. Open repository folder and run with `docker-compose up`.
## Screenshots
![register](/ss/register.png)
![register_bad](/ss/register_bad.png)
![login](/ss/login_creation.png)
App allows to create account. Registration form is validated. Every acction is confirmed by notification.

![main](/ss/main.png)
Main page contains statistics from all devices.

![settings](/ss/settings.png)
Settings allows to change user password.

![add_device](/ss/add_device.png)
![device_added](/ss/device_added.png)
Device page shows data about all devices assigned to the account. Click `Add new` to add new device.

![overview](/ss/overview.png)
Device overview contains current indications and historical data.

![overview](/ss/overview.png)
![overview_2](/ss/overview_2.png)
Device overview contains current indications and historical data.

![manual](/ss/manual.png)
Mode tab allows to set manual, time or auto mode. In manual mode power supply in Smart Socket can be manually switched on or off.

![time](/ss/time.png)
In time mode device will turn on or off after declared time.

![auto](/ss/auto.png)
In auto mode user create device work schedule by creating up to 21 rules.

![unlink](/ss/unlink.png)
After device unlink all historical telemetry data will be removed and it will be possible to assign it to other account.

## Video presentation
[YouTube](https://youtu.be/LqCKxmR3ckY)
