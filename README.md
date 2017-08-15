# Django Chat

chat app using django and Angular2.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them (expecting that your OS in linux):

```
pip 
```
to install => $sudo apt-get install python-pip

```
node 
```
to install => $curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -; $sudo apt-get install -y nodejs

```
virtualenv 
```
to install => $pip install virtualenv

### Instructions:

1- Clone project, and change directory to it. => $cd django-chat

2- Change directory to client and install package.json => cd client; npm install

3- Run client server: $ npm start

4- Chane directory to server and create new virtualenv :  $ virtualenv myEnv

5- Activate it => $source myEnv/bin/activate

6- Install packages via req. file: $ pip install –r requirements.txt

8- run server : $ python manage.py runserver

9- open your browser: http://localhost:4200/

---------------------------------------------
