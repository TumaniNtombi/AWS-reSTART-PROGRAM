Add AWS Compute notes
=======
Add AWS Compute Notes 


1. Cloud Foundation Recap

<<<<<<< HEAD
Cloud Computing: Delivery of computing resources (compute, storage, databases, networking, analytics, etc.) over the internet (“the cloud”) instead of on-premises servers.

Benefits of Cloud:

Scalability: Scale resources up or down as needed.

Cost Optimization: Pay-as-you-go pricing model.

Elasticity: Quickly adapt to workload changes.

Global Reach: Deploy applications closer to end users using AWS Regions & Availability Zones.

Security & Reliability: Managed infrastructure with encryption, compliance, and redundancy.

Cloud Models:

IaaS (Infrastructure as a Service) → e.g., Amazon EC2 (you manage OS & apps).

PaaS (Platform as a Service) → e.g., AWS Elastic Beanstalk (manage app, AWS handles OS & infrastructure).

SaaS (Software as a Service) → e.g., Amazon WorkMail (fully managed applications).

2. AWS Compute Services
2.1 Amazon EC2 (Elastic Compute Cloud)

Purpose: Virtual servers in the cloud.

Key Concepts:

Instance Types: General purpose, compute-optimized, memory-optimized, etc.

AMI (Amazon Machine Image): Preconfigured OS + software.

Key Pairs: Secure login using SSH for Linux or RDP for Windows.

Security Groups: Virtual firewall controlling inbound/outbound traffic.

Use Cases: Hosting web apps, batch processing, databases, and dev/test environments.

2.2 AWS Lambda (Serverless Computing)

Purpose: Run code without provisioning or managing servers.

Key Concepts:

Event-driven: Triggered by events (S3 upload, API Gateway requests, etc.).

No server management: AWS handles scaling automatically.

Pay per execution: Only pay for compute time consumed.

Use Cases: Microservices, data processing, automation, and backend APIs.

2.3 Auto Scaling & Load Balancing

Auto Scaling: Automatically adjusts EC2 instances based on demand.

Elastic Load Balancer (ELB): Distributes incoming traffic across multiple EC2 instances to ensure high availability and fault tolerance.

3. Key Cloud Compute Concepts

Regions & Availability Zones (AZs):

Region: Geographical area (e.g., US East, EU West).

AZ: Isolated data center within a region for redundancy.

Shared Responsibility Model:

AWS: Secures infrastructure (hardware, OS, network).

Customer: Manages OS, apps, data, and security configurations.

Elasticity vs. Scalability:

Elasticity: Automatic adjustment to workload (Auto Scaling).


Scalability: Ability to grow capacity over time (vertical or horizontal scaling).

4. Best Practices

Use security groups and IAM roles to secure compute resources.

Choose the right instance type for your workload.

Use tags to organize resources.

Enable monitoring with CloudWatch to track performance.

Leverage Auto Scaling and Load Balancers for high availability.


=======
1. Cloud Foundation Recap

Cloud Computing: Delivery of computing resources (compute, storage, databases, networking, analytics, etc.) over the internet (“the cloud”) instead of on-premises servers.

Benefits of Cloud:

Scalability: Scale resources up or down as needed.

Cost Optimization: Pay-as-you-go pricing model.

Elasticity: Quickly adapt to workload changes.

Global Reach: Deploy applications closer to end users using AWS Regions & Availability Zones.

Security & Reliability: Managed infrastructure with encryption, compliance, and redundancy.

Cloud Models:

IaaS (Infrastructure as a Service) → e.g., Amazon EC2 (you manage OS & apps).

PaaS (Platform as a Service) → e.g., AWS Elastic Beanstalk (manage app, AWS handles OS & infrastructure).

SaaS (Software as a Service) → e.g., Amazon WorkMail (fully managed applications).

2. AWS Compute Services
2.1 Amazon EC2 (Elastic Compute Cloud)

Purpose: Virtual servers in the cloud.

Key Concepts:

Instance Types: General purpose, compute-optimized, memory-optimized, etc.

AMI (Amazon Machine Image): Preconfigured OS + software.

Key Pairs: Secure login using SSH for Linux or RDP for Windows.

Security Groups: Virtual firewall controlling inbound/outbound traffic.

Use Cases: Hosting web apps, batch processing, databases, and dev/test environments.

2.2 AWS Lambda (Serverless Computing)

Purpose: Run code without provisioning or managing servers.

Key Concepts:

Event-driven: Triggered by events (S3 upload, API Gateway requests, etc.).

No server management: AWS handles scaling automatically.

Pay per execution: Only pay for compute time consumed.

Use Cases: Microservices, data processing, automation, and backend APIs.

2.3 Auto Scaling & Load Balancing

Auto Scaling: Automatically adjusts EC2 instances based on demand.

Elastic Load Balancer (ELB): Distributes incoming traffic across multiple EC2 instances to ensure high availability and fault tolerance.

3. Key Cloud Compute Concepts

Regions & Availability Zones (AZs):

Region: Geographical area (e.g., US East, EU West).

AZ: Isolated data center within a region for redundancy.

Shared Responsibility Model:

AWS: Secures infrastructure (hardware, OS, network).

Customer: Manages OS, apps, data, and security configurations.

Elasticity vs. Scalability:

Elasticity: Automatic adjustment to workload (Auto Scaling).


Scalability: Ability to grow capacity over time (vertical or horizontal scaling).

4. Best Practices

Use security groups and IAM roles to secure compute resources.

Choose the right instance type for your workload.

Use tags to organize resources.

Enable monitoring with CloudWatch to track performance.

Leverage Auto Scaling and Load Balancers for high availability.
