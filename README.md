# Resource Optimisation Service (Frontend)

Resource Optimization is a service aimed to provide existing Red Hat Enterprise Linux customers with an ability to grasp control over their investment in the Public Cloud. Read more about it [here](https://www.redhat.com/en/blog/optimize-public-cloud-workloads-rhel-red-hat-insights-resource-optimization) and go though the confluence section(check below section) for more details on same.


# Getting Started:

Please refer [Resource Optimization Service Confluence](https://docs.engineering.redhat.com/pages/viewpage.action?spaceKey=ROS&title=Resource+Optimization+Service+Home) (requires VPN)) page to find all documents related to the project

# Prerequisites

### Install

- [Node](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)

### Make sure to have test account created in CI, QA, Staging envrionments. For more details please check [here](https://docs.google.com/presentation/d/1XcbAplLOerPXaEF8DYgS336xwdfUuiUPXGXtuBfk1oY/edit?usp=sharing)


# Steps: Local Dev Setup (Frontend)

1. To get started with Resource Optimization Service (ROS), make sure you meet the prerequisites mentioned in both ros frontend and backend repos

2. Clone all required repositories in one folder:

- git clone https://github.com/RedHatInsights/insights-chrome.git
- git clone https://github.com/RedHatInsights/insights-proxy.git
- git clone https://github.com/RedHatInsights/ros-frontend.git
- git clone https://github.com/RedHatInsights/ros-backend.git

3. To run the whole dev setup, you will need to run commands in multiple terminal tabs.

[TAB 1] i.e for insights-proxy -
Follow steps from here - https://github.com/RedHatInsights/insights-frontend-storybook/blob/master/src/docs/welcome/quickStart/DOC.md#proxy
i.e

```
cd ../insights-proxy
npm install
sudo bash scripts/patch-etc-hosts.sh
bash scripts/update.sh

```

[TAB 2] i.e for insights-chrome -
Wait for insights-proxy to finish update script then follow steps from here - https://github.com/RedHatInsights/insights-frontend-storybook/blob/master/src/docs/welcome/quickStart/DOC.md#chrome
i.e

```
cd ../insights-chrome
npm install
npm run build
Open new tab [TAB 3]: ie. for ros-frontend
cd ../ros-frontend
Make sure current directory is `ros-frontend`
(In case of local ros-backend server) Add route change in the file `ros-frontend/profiles/local-frontend.js` after `routes[`/apps/${APP_ID}`]` i.e

    routes['/api/ros/v0']                = { host: 'http://localhost:8000' };
    routes['/api/inventory/v1']          = { host: 'http://localhost:8001' };

```

Go to [TAB 1]:
Make sure current directory is `insights-proxy`
Run command -

```
SPANDX_CONFIG=../ros-frontend/profiles/local-frontend.js sh scripts/run.sh

```

[TAB 3] i.e for ros-frontend -
Wait till the above steps finish their execution.

```
cd ../ros-frontend
npm install
npm run start
```

4. follow the steps mentioned in the [ros-backend repo](https://github.com/RedHatInsights/ros-backend) for setting the local ros-backend server

5. After both frontend & backend setup, go to browser and access below link https://ci.foo.redhat.com:1337/insights/ros


# Running the Tests


## Tests are run on every PR and can locally be executed with:

```
npm run test
```

##  Few of the tests are [Snapshot tests](https://jestjs.io/docs/snapshot-testing), which verify that current test output matches a snapshot taken before. If these changes are legitimate the snapshots need to be updated with:

```
npm run test -- -u
```



# Running the lint

```
// to run lint
npm run lint

// to fix lint errors
npm run lint:js:fix

```

# Deployment

Please refere this [link](https://clouddot.pages.redhat.com/docs/dev/getting-started/deploying-frontend.html) for the deployment
# Documentation

## Technology

* [React](https://reactjs.org/)
* [Jest](https://jestjs.io/)

## Major Dependencies used in the Project

- [Insights-Proxy](#insights-proxy)
- [Spandx](#spandx)
- [Insights-Chrome](#insights-chrome)
- [Patternfly](#patternfly)
- [Frontend-Components](#frontend-components)

## Insights-Proxy

[insights-proxy](https://github.com/RedHatInsights/insights-proxy) - Proxy for the insightsfrontend container


## Spandx
[spandx](https://github.com/redhataccess/spandx) is an HTTP switchboard. With it, you can weave together pieces of a large, complex website by choosing which resources should come from your local system and which should come from a remote environment.

For example, you could point spandx at your production site, but route `/static/js` to a local directory, which allows you to test your local JS against the production environment. Code in production, it's fun.

More technically, spandx is a flexible, configuration-based reverse proxy for local development.

## Insights-Chrome

[insights-chrome](https://github.com/RedHatInsights/insights-chrome)- The "wrapper" around your application!

Insights Chrome provides:

Standard header and navigation
Base CSS/style
A JavaScript library for interacting with Insights Chrome


## Patternfly
[PatternFly](https://www.patternfly.org/v4/) is an open source design system created to enable consistency and usability across a wide range of applications and use cases. PatternFly provides clear standards, guidance, and tools that help designers and developers work together more efficiently and build better user experiences.

## Frontend-Components
[Frontend-components](https://github.com/RedHatInsights/frontend-components) is a monorepo of Red Hat Cloud services Components for applications in a React.js environment. This repo uses a lot of components imported from the frontend-components repo.


