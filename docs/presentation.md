## DONE:

1. Read and browse on internet about the requirements  
2. Analysed the solution using PlantUML diagrams  
3. Created the basic global monorepo structure  
4. Added the API backend on Next.js with:  
   4.1. Linked the ORM  
   4.2. Created the migrations with the models and the seeds to manage the roles, permissions and the tasks  
   4.3. Configured and exposed the Postgres and Redis in the global Docker compose  
   4.4. Exposed the APIs  
   4.5. Implemented the JWT into a decorator (using passport-jwt and @nestjs/passport)  
   4.6. Implemented the role-based access control RBAC  
   4.7. Created some Jest tests  
   4.8. Added the backend in the global Docker compose  
5. Added the Frontend in Angular  
   5.1. Created the basic Angular file structure  
   5.2. Set tailwind configuration and themes  
   5.3. Created the auth service interceptor  
   5.4. Created the Task store and core services  
   5.5. Created the components filters-card, kanban-column, login-card, progress-card, quick-create, top-bar (ts, html and specs)  
   5.6. Added the frontend in the global Docker compose  


---

## In progress:

4- Finish some features on filters-card, kanban-column, login-card, progress-card, quick-create, top-bar (ts, html and specs)  

---

## TODO IMMEDIATE:

0- Modify the file structure to use explicitly the Nx as a file structure generator (npm package). I made it manually without knowing that the npm package Nx exists, and read about it at the end of the 8 hours. I'm used to work on different repos (one for the frontend and one for the backend).  
1- Refactor the project to auto-generate the DTOs on the shared /lib folder  
2- Fix the text in the cards when they are moved  
3- Implement /audit-log and the task edit in the frontend  
4- Fix the background in mobile version  
5- Implement the unit tests for the frontend  
6- Increase the unit test coverage in the backend  
7- Add some branding in the frontend  

---

## TODO FUTURE:

* Using agile methods to obtain feedback from the end user  
* Expose the SWAGGER, Postman or other APIs documentation (todo: verify if Nx offers this option in the documentation or do it manually).  
* Display errors and notifications on the frontend  
* Add the drag and drop  
* Create CSRF protection  
* Create Cucumber E2E tests  
* Create Newman tests  
* Add a feature flag system to enable and disable features dynamically and independently  
* Add multi-factor authentication (MFA) and email verification on signup  
* Deploy the solution on AWS, other cloud services or On-premise.  
  * Example: S3 web hosting for the build in Angular and AWS  
  * Create a CI/CD flow  
    The CI/CD should at least use the envs of DEV and PROD. Every commit should be validated by the QA/Tech lead/PO before being merged on PROD.  
    * Verify the test coverage and refuse the PR if the test coverage is less than X%  
    * Verify the build  
    * Require only 1 commit in the PR  
    * Verify if there are no vulnerabilities using DBs like SNYK  
    * Deploy automatically on DEV when the pull request is merged in the DEV branch  
    * The PR should be rebased from the master  
    * The ticket link should be linked in the PR  
    * Require 1 approbation by a peer and 1 approbation by the QA/Tech lead  
    * Deploy automatically on PROD when the pull request is merged in the master branch  
    * Send a notification to the stakeholders  
  * Inject the secrets dynamically into the pipelines  
* Enhance the AWS | cloud architecture:  
  * Save cloud cost as much as possible with serverless cloud services like AWS Lambda  
  * Use AWS services like AWS Fargate to deploy  
  * SSO services:  
    * Add SSO services like AWS Cognito to enhance the user experience.  
    * If it's an internal dashboard and the other users have AWS accounts use AWS IAM Identity Center  
    * If the users are exclusively US veterans use the Org Active Directory (Amazon Directory)  
    * Cache the HTTP queries with services like Redis to speed up the response time and save some resources on the main server.  
    * Add security services to protect against DDOS, SQLi, XSS, malicious activities ... -> AWS Shield, AWS WAF, GuardDuty  
    * Multi AWS zone AZ for high availability HA  
    * Use AWS Relational Database Service (RDS) Aurora for quicker response time (can be 5 times quicker than an on-premise Postgres).  
