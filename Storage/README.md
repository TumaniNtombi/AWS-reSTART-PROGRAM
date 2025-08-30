# AWS Storage Notes

## 1. Overview

AWS provides a variety of storage solutions for different use cases—from temporary storage for running applications to long-term archival storage. The goal is to deliver **scalable, durable, and secure storage** while allowing flexibility to optimize **cost and performance**.

**Key Benefits:**
- **Durability:** Services like S3 are designed for 99.999999999% (11 9s) durability.  
- **Scalability:** Automatically scale storage capacity based on demand.  
- **Cost-effectiveness:** Pay only for what you use; leverage storage classes for savings.  
- **Global accessibility:** Store data in multiple regions for low-latency access.  
- **Integration:** Easily connect storage to compute, database, and analytics services.  

---

## 2. Main Services

### **Amazon S3 (Simple Storage Service)**
- **Type:** Object storage  
- **Use Cases:** Backup & restore, static website hosting, data lakes, media storage  

**Features:**
- **Buckets:** Containers for storing objects (files). Each object has a key (name).  
- **Storage Classes:** Standard, Intelligent-Tiering, Infrequent Access (IA), Glacier, Glacier Deep Archive  
- **Versioning:** Keep multiple object versions to protect against accidental deletion  
- **Lifecycle Policies:** Automate transitioning objects to cheaper storage classes  
- **Encryption:** Server-side (SSE-S3, SSE-KMS) or client-side encryption  

**Example:** Store website images in S3 and automatically move older images to Glacier for archival.  

[Learn more about S3 →](https://aws.amazon.com/s3/)

---

### **Amazon EBS (Elastic Block Store)**
- **Type:** Block storage for EC2 instances (like a virtual hard drive)  
- **Use Cases:** Databases, boot volumes, transactional workloads  

**Features:**
- **Persistent:** Data persists even if EC2 instance is stopped or terminated (unless delete-on-termination is selected)  
- **Snapshot Support:** Create backups for recovery or duplicating environments  
- **Performance Options:** SSD (gp3, io2) and HDD (st1, sc1) for different workloads  

**Example:** Attach an EBS volume to an EC2 instance running a MySQL database for high-performance storage.  

[Learn more about EBS →](https://aws.amazon.com/ebs/)

---

### **Amazon Glacier & Glacier Flexible Retrieval**
- **Type:** Low-cost archival storage  
- **Use Cases:** Compliance data, long-term backups, rarely accessed files  

**Features:**
- **Retrieval Times:** Flexible retrieval in minutes to hours depending on urgency  
- **Cost-effective:** Cheapest storage option in AWS  
- **Integration:** Use S3 lifecycle policies to automatically archive objects  

**Example:** Move yearly financial records from S3 Standard to Glacier for archival.

---

### **Amazon EFS (Elastic File System)**
- **Type:** Managed file storage for EC2 instances (shared storage)  
- **Use Cases:** Shared application data, CMS, big data analytics  

**Features:**
- **NFS Protocol:** Mountable by multiple EC2 instances  
- **Elastic:** Automatically grows or shrinks as files are added or removed  
- **Highly Available:** Spans multiple AZs in a region  

**Example:** Multiple web servers mount the same EFS file system to serve shared content.  

[Learn more about EFS →](https://aws.amazon.com/efs/)

---

## 3. Key Concepts

### **Buckets**
- Logical containers in S3 for storing objects  
- Each bucket must have a unique global name  
- Access controlled via **Bucket Policies** and **IAM policies**

### **Storage Classes**
- **Standard:** Frequently accessed data  
- **Infrequent Access (IA):** Less frequent access but fast retrieval  
- **Glacier:** Low-cost archival, retrieval in minutes to hours  
- **Glacier Deep Archive:** Lowest-cost storage, retrieval in hours  

### **Versioning**
- Protects against accidental overwrites or deletions  
- Older versions can be retained indefinitely  

### **Encryption**
- **Server-side encryption (SSE):** AWS-managed  
- **Client-side encryption:** You encrypt before upload  
- **KMS Integration:** Use AWS Key Management Service for key management  

---

## 4. Best Practices

1. Use **lifecycle policies** to automatically move data to cheaper storage classes  
2. Enable **versioning** to protect critical data  
3. Apply **least-privilege IAM policies** to control access  
4. Monitor usage and costs with **AWS Cost Explorer** and storage metrics  
5. Enable **encryption at rest and in transit** for sensitive data  
6. Use **tags** to organize buckets by project, department, or cost center  
7. Regularly review storage class usage to optimize cost  
8. Combine EBS, S3, Glacier, and EFS according to workload requirements  
9. Implement backups for persistent storage volumes  
10. Test retrieval and restoration procedures periodically  

---

**This README.md provides a structured reference for AWS storage services, key concepts, and best practices, ready for your AWS re/Start repository.**
