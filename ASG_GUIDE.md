# 📝 Task Manager App (Auto Scaling Group and Load Balancer)

## 2-tier deployment

- Information on how I set up my Client and Server tiers for my deployment can be found [here](AWS_SETUP)

## ⚖️ Auto Scaling Group (ASG)
- **What it does** - ASG automatically adds or removes EC2 instances based on demand.

    - ***How it works***
        - ASG Configuration:
            - Min instances: 2  - *Always keep at least 2 running*
            - Max instances: 10 - *Never go above 10*
            - Desired: 2 - *Want 2 running now*
        - Scaling Rules:
            - CPU > 70% for 5 min -> Add 2 instances
            - CPU < 30% for 10 min -> Remove 1 instance
            - Memory > 80% -> Add 1 instance

## ⚖️ Load Balancer (ALB - Application Load Balancer)
- **What it does** - Distributes incoming traffic across multiple instances
    - ***How it works***
        - Health Check (every 30 seconds):
            - Load Balancer asks: 'Are you alive?'
            - Instance A: 'Yes, I'm fine!' -> Keep sending traffic
            - Instance B: (no response) -> STOP sending traffic
            - Instance B recovers: "I'm back!" -> Resume sending traffic

## How they work together
![ASG Diagram](/images/ASGDiagram.png)


## ⚒️Setting up my project

After setting up and testing my app and database, I created Amazon Machine Images from each.  I used the app AMI to create a launch template

### 🗃️ Database (Server tier)
To get the public address of the server tier, which I used to connect to client tier, I spun an EC2 instance, so that I could get the `public IPV4 address`

### 🔍 Monitoring
- I created Cloudwatch alarms and a dashboard to monitor CPU Utilization, Network packets, etc.

![CPU Dashboard](/images/CPUDashboard.png)



### App (Client tier)
#### Launch template
![Launch template](/images/launchtemplate.png)

When I was setting up my launch template, I included User Data, this helps during ASG so that everything is spun up automatically without the need for me to set this up manually.

![User Data](/images/UserData.png)

### Setting up ASG
To setup my Auto Scaling Group, I used my launch template and set the following:
- Launch template
- Launch options (Availability Zones)
    ![Network](/images/asgreview.png)
- How it would integrate with other services
- Configured Group size and scaling 
    ![Group size](/images/asggroupsize.png)
- I didn't set any notification, but I had the option to
- Tags

After I completed it, it was listed in the Auto Scaling groups page

![Completed ASG](/images/asggroupspage.png)

As you can see below, my ASG span up the correct number of instances and both are 'Healthy'.
![ASG Overview](/images/asginstanceman.png)


I terminated one instance manually.
![Unhealth Instance](/images/unhealthy.png)

In less than 5 minutes (I set the heath check grace period to 5 mins), a new instance was spun up.
![New Instance](/images/autoscaling.png)


Whilst setting up my ASG, I had the option to set up my Load Balancer.
![ASG LB](/images/asglb.png)

When I clicked on the 'Load Balancers' option on the side menu, I could view the the LB that I had just set up
![MyLB](/images/mylb.png)

Clicking on it displayed the LB summary page with all the information needed.
![Load Balancer Summary](/images/lbsummary.png)

On the Load Balancer Summary page, I copied my DNS into my browser address bar and viewed my app
![DNS Link](/images/lbdnsname.png)



