# Resource Optimization Service (Frontend)

Resource Optimization is a service that can help you optimize your public cloud workloads on Red Hat Enterprise Linux (RHEL). Read more about it [here](https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_and_monitoring_rhel_resource_optimization_with_insights_for_red_hat_enterprise_linux/index)

## Prerequisites

### Install

- [Node](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/) or [Podman](https://podman.io/)


## Setup Development Environment

1. Clone below repository:

```
git clone https://github.com/RedHatInsights/ros-frontend.git
```


2. Make sure you meet the prerequisites mentioned in both frontend and backend repositories.Also Setup the initial /etc/hosts entries - (do this once)

```
Edit /etc/hosts

Add below content:
127.0.0.1 stage.foo.redhat.com
127.0.0.1 prod.foo.redhat.com
```

OR

run the script (with sudo)

```
npm run patch:hosts
```


### With deployed backend (Stage+Prod)
3. To run the dev setup, go to directory where you have cloned ros-frontend repo


[With Stage/Production Backend] ROS Frontend TAB

```
cd ../ros-frontend
npm install
npm run start
```

Follow the prompts that follow and select the required envrionment: stage/prod

```
Which platform environment you want to use? 
> stage 
  prod 
```

This will run the ros-frontend pointing to backend deployed to the selected envrionment. Once it is running go to browser and access it using `https://stage.foo.redhat.com:1337/insights/ros`(for Stage) OR `https://prod.foo.redhat.com:1337/insights/ros`(for Production) link.

Note: In case you see the error `You cannot visit stage.foo.redhat.com right now because the website uses HSTS....` while accessing the website in chrome then see the thisisunsafe section on: https://cybercafe.dev/thisisunsafe-bypassing-chrome-security-warnings/ and follow the same.



### With local backend


3. Follow the steps mentioned under the [ros-backend](https://github.com/RedHatInsights/ros-backend) repository for setting up local backend server.

4. [With local Backend] ROS Frontend TAB

```
cd ../ros-frontend
npm install
npm run local
```

This will run the ros-frontend pointing to local backend. Once it is running go to browser and access it using `https://stage.foo.redhat.com:1337/insights/ros` link.


please check `package.json` for other available scripts

### With local pdf-generator backend

We use [pdf-generator](https://github.com/RedHatInsights/pdf-generator) service to generate PDF reports such as Executive report. To test the changes with local running `pdf-generator` backend service, follow the below steps. [check the documentation](https://github.com/RedHatInsights/pdf-generator/blob/main/docs/local-development-setup.md) for more details.

1. Clone below repositories:

```
git clone https://github.com/RedHatInsights/ros-frontend.git
git clone https://github.com/RedHatInsights/pdf-generator.git 
```


2. Make sure you meet the prerequisites mentioned in both [ros-rhel frontend](https://github.com/RedHatInsights/ros-frontend?tab=readme-ov-file#prerequisites) and [pdf-generator backend](https://github.com/RedHatInsights/pdf-generator/blob/main/docs/local-development-setup.md#prerequisites) repositories.Also Setup the initial /etc/hosts entries - (do this once)

```
Edit /etc/hosts

Add below content:
127.0.0.1 stage.foo.redhat.com
127.0.0.1 prod.foo.redhat.com
```

OR

run the script (with sudo)

```
npm run patch:hosts
```

3. Run pdf-generator locally

```
Start the pdf-generator container
[pdf-generator]$ podman-compose up
```

```
Start pdf-generator server 

[pdf-generator]$ API_HOST=https://console.stage.redhat.com ASSETS_HOST=https://stage.foo.redhat.com:1337 PROXY_AGENT=http://squid.corp.redhat.com:3128 npm run start:server

//this is for stage envrionment, update the above URLS based on the envrionment you would like to target
```

4. run ros-rhel frontend 

```
cd ../ros-frontend
npm install
npm run start:local-pdf
```


## Running the Tests


Tests can be executed with:

```
npm run test
```

Few tests are [Snapshot tests](https://jestjs.io/docs/snapshot-testing) used to verify that current test output matches a snapshot taken before. If these changes are legitimate, the snapshots need to be updated with:

```
npm run test -- -u
```



## Running the lint

```
// to run lint
npm run lint

// to fix lint errors
npm run lint:js:fix

```

## Deployment

Please refer this [link](https://docs.google.com/document/d/1PKGLs1zaBvSyOGHQqjVEfADRyCiBknzmGLJjZvNlw7s/edit?usp=sharing)


## Documentation

### Technology

* [React](https://reactjs.org/)
* [Jest](https://jestjs.io/)

### Major Dependencies used in the Project

- [Insights-Chrome](#insights-chrome)
- [Patternfly](#patternfly)
- [Frontend-Components](#frontend-components)


### Insights-Chrome

[insights-chrome](https://github.com/RedHatInsights/insights-chrome)- The "wrapper" around your application!

Insights Chrome provides:

- Standard header and navigation
- Base CSS/style
- A JavaScript library for interacting with Insights Chrome


### Patternfly

[PatternFly](https://www.patternfly.org/v4/) is an open source design system created to enable consistency and usability across a wide range of applications and use cases. PatternFly provides clear standards, guidance, and tools that help designers and developers work together more efficiently and build better user experiences.

### Frontend-Components

[Frontend-components](https://github.com/RedHatInsights/frontend-components) is a monorepo of Red Hat Cloud services Components for applications in a React.js environment. This repo uses a lot of components imported from the frontend-components repo.


