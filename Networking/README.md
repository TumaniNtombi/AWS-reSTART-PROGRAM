# AWS Networking Notes

## 1. Overview

AWS networking allows you to **connect, isolate, and secure your cloud resources**. It provides the infrastructure for your applications to communicate internally (within AWS) and externally (with the internet or on-premises). Understanding networking is critical for designing **secure, scalable, and high-performance applications**.

**Key Benefits:**
- **Secure communication:** Control access with firewalls, security groups, and NACLs  
- **Isolation:** Create logically isolated networks for workloads  
- **High availability:** Deploy resources across multiple Availability Zones  
- **Scalable connectivity:** Support dynamic scaling and multi-region deployments  

---

## 2. Core Networking Services

### **2.1 Amazon VPC (Virtual Private Cloud)**
A **Virtual Private Cloud (VPC)** is a logically isolated section of AWS where you can launch resources with full control over networking.

**Key Concepts:**
- **Subnets:** Divisions of a VPC (Public, Private, and Isolated subnets)  
- **Route Tables:** Direct traffic within the VPC and to the internet  
- **Internet Gateway (IGW):** Connects VPC to the internet  
- **NAT Gateway/Instance:** Allows private subnet resources to access the internet securely  
- **Security Groups:** Virtual firewalls for EC2 instances  
- **Network ACLs:** Optional stateless layer of security for subnets  

**Example:** Launch a web server in a public subnet and a database in a private subnet, controlling access via security groups.

**VPC Architecture Diagram:**

pgsql
Copy code
           +-------------------------+
           |        Internet         |
           +-----------+-------------+
                       |
               [Internet Gateway]
                       |
           +-----------+-------------+
           |         VPC             |
           |  CIDR: 10.0.0.0/16     |
           +-----------+-------------+
             |                   |
       +-----+-----+       +-----+-----+
       | Public Subnet|     | Private Subnet|
       | 10.0.1.0/24 |     | 10.0.2.0/24  |
       +-----+-----+       +-----+-----+
             |                   |
       [EC2 Web Server]      [EC2 DB Server]
yaml
Copy code

---

### **2.2 Subnets**
- **Public Subnet:** Connected to the internet via IGW  
- **Private Subnet:** No direct internet access; use NAT for outbound connectivity  
- **Isolated Subnet:** No internet access (used for sensitive workloads)  

---

### **2.3 Route Tables**
- Determine how traffic flows within a VPC and outside  
- Associate route tables with subnets  
- Example routes:  
  - 10.0.0.0/16 → local (internal VPC traffic)  
  - 0.0.0.0/0 → IGW (internet traffic)  

---

### **2.4 Internet Gateway (IGW)**
- Enables resources in public subnets to access the internet  
- Highly available, horizontally scaled, managed by AWS  

---

### **2.5 NAT Gateway / NAT Instance**
- Allows **outbound internet access** for instances in private subnets  
- NAT Gateway: Fully managed, scalable  
- NAT Instance: User-managed, requires maintenance  

---

### **2.6 Security Groups vs Network ACLs**
| Feature               | Security Group                     | Network ACL                      |
|-----------------------|-----------------------------------|----------------------------------|
| Level                 | Instance-level                     | Subnet-level                     |
| Stateful/Stateless    | Stateful                           | Stateless                        |
| Rules                 | Allow only                          | Allow and Deny                    |
| Default Behavior      | Deny all inbound, allow all outbound | Allow all inbound/outbound by default |

---

### **2.7 AWS Transit Gateway**
- Connects multiple VPCs and on-premises networks centrally  
- Simplifies complex peering and hybrid network architecture  

---

### **2.8 VPN & Direct Connect**
- **Site-to-Site VPN:** Secure IPSec tunnel between on-premises network and AWS VPC  
- **AWS Direct Connect:** Dedicated network connection for high throughput, low-latency access  

---

## 3. Key Concepts

### **CIDR Blocks**
- Defines IP address range for VPC and subnets  
- Example: VPC: 10.0.0.0/16, Public subnet: 10.0.1.0/24, Private subnet: 10.0.2.0/24  

### **Elastic IPs**
- Static public IPv4 address  
- Assign to EC2 instances in public subnets for consistent internet access  

### **VPC Peering**
- Enables private communication between two VPCs  
- Can be intra-region or inter-region  

---

## 4. Best Practices

1. Use **private subnets** for databases and internal services  
2. Enable **flow logs** for VPC and subnets to monitor traffic  
3. Implement **least-privilege rules** for security groups and NACLs  
4. Use **multiple Availability Zones** for high availability  
5. Plan **IP addressing and CIDR ranges** carefully for future expansion  
6. Separate workloads using **isolated VPCs** for security or compliance  

---

---

**This README.md provides a structured reference for AWS networking services, VPC architecture, and best practices, read
