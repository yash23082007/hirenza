export interface NoteSection {
  title: string;
  keyPoints: string[];
  importantTerms?: string[];
}

export interface NoteContent {
  id: string;
  title: string;
  icon: string;
  sections: NoteSection[];
  tag?: string;
  date?: string;
  coverGradient?: string;
  pdfUrl?: string;
}

export const notesContent: NoteContent[] = [
  {
    id: "cn",
    title: "Computer Networks",
    icon: "🌐",
    sections: [
      {
        title: "OSI Model",
        keyPoints: [
          "7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application",
          "Each layer has specific responsibilities and protocols",
          "Encapsulation happens as data moves down the stack",
          "Decapsulation happens as data moves up the stack",
        ],
        importantTerms: ["TCP/IP", "HTTP", "FTP", "DNS", "DHCP"],
      },
      {
        title: "TCP vs UDP",
        keyPoints: [
          "TCP: Connection-oriented, reliable, ordered delivery, flow control",
          "UDP: Connectionless, unreliable, faster, no guarantee",
          "TCP uses 3-way handshake (SYN, SYN-ACK, ACK)",
          "UDP used for: DNS, streaming, gaming, VoIP",
        ],
        importantTerms: ["Three-way Handshake", "Sliding Window", "Congestion Control"],
      },
      {
        title: "HTTP Methods",
        keyPoints: [
          "GET: Retrieve data (idempotent)",
          "POST: Create new resource (not idempotent)",
          "PUT: Update/replace entire resource (idempotent)",
          "PATCH: Partial update (not always idempotent)",
          "DELETE: Remove resource (idempotent)",
        ],
        importantTerms: ["Idempotent", "Safe Methods", "Status Codes"],
      },
      {
        title: "DNS Resolution",
        keyPoints: [
          "1. Browser cache → 2. OS cache → 3. Resolver → 4. Root DNS → 5. TLD DNS → 6. Authoritative DNS",
          "Recursive vs Iterative queries",
          "A records (IPv4), AAAA records (IPv6), CNAME (alias)",
          "DNS caching reduces lookup time",
        ],
        importantTerms: ["Recursive Query", "Iterative Query", "TTL", "Zone File"],
      },
    ],
  },
  {
    id: "dbms",
    title: "Database Management Systems",
    icon: "🗄️",
    sections: [
      {
        title: "ACID Properties",
        keyPoints: [
          "Atomicity: All or nothing - transaction either completes fully or not at all",
          "Consistency: Database remains in valid state before and after transaction",
          "Isolation: Concurrent transactions don't interfere with each other",
          "Durability: Once committed, changes persist even after system failure",
        ],
        importantTerms: ["Transaction", "Rollback", "Commit", "Recovery"],
      },
      {
        title: "Normalization",
        keyPoints: [
          "1NF: Atomic values, no repeating groups",
          "2NF: 1NF + no partial dependencies (all non-key attributes depend on full primary key)",
          "3NF: 2NF + no transitive dependencies",
          "BCNF: Every determinant is a candidate key",
          "Goal: Reduce redundancy, avoid anomalies",
        ],
        importantTerms: ["Functional Dependency", "Partial Dependency", "Transitive Dependency"],
      },
      {
        title: "SQL Joins",
        keyPoints: [
          "INNER JOIN: Only matching rows from both tables",
          "LEFT JOIN: All rows from left + matching from right (NULL if no match)",
          "RIGHT JOIN: All rows from right + matching from left",
          "FULL OUTER JOIN: All rows from both tables",
          "CROSS JOIN: Cartesian product (every row with every row)",
        ],
        importantTerms: ["Foreign Key", "Primary Key", "Cartesian Product"],
      },
      {
        title: "Indexing",
        keyPoints: [
          "B-Tree Index: Default, good for range queries and equality",
          "Hash Index: Fast for equality, no range queries",
          "Clustered Index: Determines physical order (only one per table)",
          "Non-clustered Index: Separate structure pointing to data",
          "Trade-off: Faster reads but slower writes",
        ],
        importantTerms: ["B-Tree", "Hash Index", "Clustered", "Non-clustered", "Query Optimization"],
      },
    ],
  },
  {
    id: "os",
    title: "Operating Systems",
    icon: "💻",
    sections: [
      {
        title: "Process vs Thread",
        keyPoints: [
          "Process: Independent execution unit with own memory space",
          "Thread: Lightweight process, shares memory with other threads in same process",
          "Context switching: Threads faster than processes",
          "Threads share: Code, Data, File descriptors. Each has: Stack, Registers",
        ],
        importantTerms: ["Context Switch", "IPC", "Race Condition", "Deadlock"],
      },
      {
        title: "CPU Scheduling Algorithms",
        keyPoints: [
          "FCFS: First Come First Serve - simple, convoy effect",
          "SJF: Shortest Job First - optimal avg waiting time, starvation possible",
          "Round Robin: Time quantum, fair for interactive systems",
          "Priority: Higher priority first, starvation possible (use aging)",
          "Multilevel Queue: Different queues for different process types",
        ],
        importantTerms: ["Time Quantum", "Preemption", "Starvation", "Aging"],
      },
      {
        title: "Deadlock",
        keyPoints: [
          "4 Necessary Conditions (Coffman): Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait",
          "Prevention: Break one of the 4 conditions",
          "Avoidance: Banker's Algorithm (safe state)",
          "Detection: Wait-for graph, resource allocation graph",
          "Recovery: Process termination or resource preemption",
        ],
        importantTerms: ["Banker's Algorithm", "Safe State", "Resource Allocation Graph"],
      },
      {
        title: "Memory Management",
        keyPoints: [
          "Paging: Divide memory into fixed-size pages/frames",
          "Segmentation: Divide memory into variable-size segments",
          "Virtual Memory: Use disk as extension of RAM",
          "Page Replacement: FIFO, LRU, Optimal",
          "Thrashing: Excessive paging, system slow",
        ],
        importantTerms: ["Page Table", "TLB", "Page Fault", "Demand Paging"],
      },
    ],
  },
  {
    id: "oops",
    title: "Object-Oriented Programming",
    icon: "🎯",
    sections: [
      {
        title: "Four Pillars of OOP",
        keyPoints: [
          "Encapsulation: Bundle data and methods, control access (private, public, protected)",
          "Abstraction: Hide complexity, expose only essential features",
          "Inheritance: Child class inherits properties from parent class",
          "Polymorphism: Same interface, different implementations (overloading, overriding)",
        ],
        importantTerms: ["Access Modifiers", "Method Overloading", "Method Overriding"],
      },
      {
        title: "SOLID Principles",
        keyPoints: [
          "S - Single Responsibility: Class has one reason to change",
          "O - Open/Closed: Open for extension, closed for modification",
          "L - Liskov Substitution: Subtypes must be substitutable for base types",
          "I - Interface Segregation: Many specific interfaces > one general interface",
          "D - Dependency Inversion: Depend on abstractions, not concretions",
        ],
        importantTerms: ["Coupling", "Cohesion", "Design Patterns"],
      },
      {
        title: "Abstract Class vs Interface",
        keyPoints: [
          "Abstract Class: Can have implementation, single inheritance, constructors allowed",
          "Interface: No implementation (pre-Java 8), multiple inheritance, no constructors",
          "Use Abstract: When classes share common code, need state",
          "Use Interface: Define contract, multiple inheritance needed, no shared code",
        ],
        importantTerms: ["Pure Virtual Function", "Multiple Inheritance", "Diamond Problem"],
      },
    ],
  },
  {
    id: "system-design",
    title: "System Design",
    icon: "🏗️",
    sections: [
      {
        title: "Scalability",
        keyPoints: [
          "Vertical Scaling: Add more resources to single machine (CPU, RAM)",
          "Horizontal Scaling: Add more machines (preferred for distributed systems)",
          "Load Balancer: Distribute traffic across servers",
          "Database Sharding: Split database across multiple machines",
          "Caching: Store frequently accessed data in memory (Redis, Memcached)",
        ],
        importantTerms: ["CAP Theorem", "Consistency", "Availability", "Partition Tolerance"],
      },
      {
        title: "Database Design",
        keyPoints: [
          "SQL vs NoSQL: Structured vs flexible schema, ACID vs BASE",
          "Replication: Master-Slave, Master-Master for redundancy",
          "Sharding: Horizontal partitioning across multiple databases",
          "Indexing: B-Tree, Hash, improve query performance",
          "Normalization: Reduce redundancy (1NF, 2NF, 3NF, BCNF)",
        ],
        importantTerms: ["ACID", "BASE", "Replication", "Sharding", "Partitioning"],
      },
      {
        title: "Caching Strategies",
        keyPoints: [
          "Cache-Aside: Application manages cache, load on miss",
          "Write-Through: Write to cache and DB simultaneously",
          "Write-Back: Write to cache first, async write to DB",
          "Cache Invalidation: TTL, LRU, event-based",
          "CDN: Cache static assets at edge locations",
        ],
        importantTerms: ["Cache Hit", "Cache Miss", "TTL", "LRU", "CDN"],
      },
      {
        title: "Message Queues",
        keyPoints: [
          "Purpose: Decouple components, handle async processing",
          "RabbitMQ: Traditional message broker, AMQP protocol",
          "Kafka: Distributed streaming platform, high throughput",
          "Pub/Sub: Publishers send messages, subscribers receive",
          "Use Cases: Background jobs, event processing, microservices communication",
        ],
        importantTerms: ["Producer", "Consumer", "Topic", "Partition", "Offset"],
      },
    ],
  },
  {
    id: "aws",
    title: "Amazon Web Services",
    icon: "☁️",
    sections: [
      {
        title: "Core Services",
        keyPoints: [
          "EC2: Virtual servers in cloud (compute)",
          "S3: Object storage (files, images, backups)",
          "RDS: Managed relational databases (MySQL, PostgreSQL)",
          "Lambda: Serverless compute (run code without servers)",
          "VPC: Virtual private cloud (networking, security)",
        ],
        importantTerms: ["Regions", "Availability Zones", "Edge Locations"],
      },
      {
        title: "IAM & Security",
        keyPoints: [
          "IAM: Identity and Access Management",
          "Users: Individual people, Groups: Collection of users",
          "Roles: Permissions for AWS services, not users",
          "Policies: JSON documents defining permissions",
          "Best Practice: Least privilege, MFA, rotate credentials",
        ],
        importantTerms: ["Access Key", "Secret Key", "Policy", "Role", "MFA"],
      },
      {
        title: "Scaling & Load Balancing",
        keyPoints: [
          "Auto Scaling: Automatically adjust EC2 instances based on demand",
          "Elastic Load Balancer: Distribute traffic across instances",
          "Types: Application (L7), Network (L4), Classic (legacy)",
          "Scaling Policies: Target tracking, step scaling, scheduled",
          "CloudWatch: Monitoring and metrics for AWS resources",
        ],
        importantTerms: ["Auto Scaling Group", "Launch Configuration", "Health Check"],
      },
    ],
  },
  {
    id: "docker",
    title: "Docker & Containerization",
    icon: "🐳",
    sections: [
      {
        title: "Core Concepts",
        keyPoints: [
          "Container: Lightweight, standalone, executable package",
          "Image: Read-only template with instructions (Dockerfile)",
          "Dockerfile: Instructions to build an image",
          "Registry: Store and distribute images (Docker Hub)",
          "Container vs VM: Containers share host OS kernel, VMs have own OS",
        ],
        importantTerms: ["Docker Daemon", "Docker Client", "Image Layer", "Union FS"],
      },
      {
        title: "Docker Compose",
        keyPoints: [
          "Purpose: Define and run multi-container applications",
          "docker-compose.yml: YAML file defining services",
          "Services: Containers that make up your app",
          "Networks: Communication between containers",
          "Volumes: Persistent data storage",
        ],
        importantTerms: ["Service", "Network", "Volume", "Dependency"],
      },
      {
        title: "Best Practices",
        keyPoints: [
          "Use official base images (alpine for small size)",
          "Minimize layers (combine RUN commands)",
          "Use .dockerignore to exclude unnecessary files",
          "Don't run as root (use USER directive)",
          "Multi-stage builds: Separate build and runtime stages",
        ],
        importantTerms: ["Alpine", "Multi-stage Build", "Layer Cache", ".dockerignore"],
      },
    ],
  },
  {
    id: "kubernetes",
    title: "Kubernetes",
    icon: "⎈",
    sections: [
      {
        title: "Core Components",
        keyPoints: [
          "Pod: Smallest deployable unit, contains one or more containers",
          "Node: Worker machine (VM or physical) running pods",
          "Cluster: Group of nodes managed by Kubernetes",
          "Namespace: Virtual cluster within a cluster (isolation)",
          "Control Plane: API Server, Scheduler, Controller Manager, etcd",
        ],
        importantTerms: ["Master Node", "Worker Node", "kubelet", "kube-proxy"],
      },
      {
        title: "Workload Resources",
        keyPoints: [
          "Deployment: Manages ReplicaSets, declarative updates",
          "ReplicaSet: Ensures specified number of pod replicas",
          "StatefulSet: For stateful applications (databases)",
          "DaemonSet: Runs pod on every node (logging, monitoring)",
          "Job/CronJob: One-time or scheduled tasks",
        ],
        importantTerms: ["Rolling Update", "Rollback", "Blue-Green", "Canary"],
      },
      {
        title: "Services & Networking",
        keyPoints: [
          "Service: Stable endpoint for accessing pods",
          "ClusterIP: Internal access only",
          "NodePort: Expose on each node's IP",
          "LoadBalancer: Cloud provider load balancer",
          "Ingress: HTTP/HTTPS routing to services",
        ],
        importantTerms: ["ClusterIP", "NodePort", "LoadBalancer", "Ingress Controller"],
      },
    ],
  },
  {
    id: "low-level-design",
    title: "Low-Level Design & OOP",
    icon: "📐",
    tag: "Design Patterns",
    date: "2026-02-12",
    coverGradient: "from-emerald-600 to-teal-700",
    sections: [
      {
        title: "SOLID Principles in Practice",
        keyPoints: [
          "Single Responsibility: A class should have only one reason to change.",
          "Open/Closed: Open for extension via interfaces, closed for modification.",
          "Liskov Substitution: Subtypes must be substitutable for base types without breaking invariants.",
          "Interface Segregation: Clients should never be forced to depend on methods they don't use.",
          "Dependency Inversion: High-level modules should depend on abstractions, not concrete classes.",
        ],
        importantTerms: ["Tight Coupling", "High Cohesion", "Inversion of Control", "Dependency Injection"],
      },
      {
        title: "Essential Gang of Four (GoF) Patterns",
        keyPoints: [
          "Creational: Factory Method, Abstract Factory, Builder, Singleton.",
          "Structural: Adapter, Decorator, Facade, Composite, Proxy.",
          "Behavioral: Strategy, Observer, Command, State, Chain of Responsibility.",
        ],
        importantTerms: ["Strategy Pattern", "Observer Pattern", "Decorator Pattern", "State Machine"],
      },
    ],
  },
  {
    id: "java",
    title: "Java 21 & Concurrency",
    icon: "☕",
    tag: "JVM & Concurrency",
    date: "2026-01-15",
    coverGradient: "from-red-600 to-rose-700",
    sections: [
      {
        title: "Modern Java Features (Java 17 to 21)",
        keyPoints: [
          "Virtual Threads (Project Loom): Lightweight M:N user-mode threads for high throughput.",
          "Records: Immutable data carriers with automatic equals, hashCode, and toString.",
          "Pattern Matching: Pattern matching for switch expressions and instanceof.",
          "Sealed Classes: Restricting subclass inheritance hierarchies for domain modeling.",
        ],
        importantTerms: ["Virtual Threads", "Carrier Thread", "Records", "Pattern Matching"],
      },
      {
        title: "Memory Model & Garbage Collection",
        keyPoints: [
          "JVM Memory: Heap (Young/Old Gen), Metaspace, Thread Stacks.",
          "Garbage Collectors: G1GC (default), ZGC (sub-millisecond pause times), Shenandoah.",
          "Volatile Keyword: Guarantees visibility across CPU caches and prevents instruction reordering.",
        ],
        importantTerms: ["ZGC", "Volatile", "Happens-Before", "Metaspace"],
      },
    ],
  },
  {
    id: "typescript",
    title: "Advanced TypeScript",
    icon: "🔷",
    tag: "Type System",
    date: "2026-02-28",
    coverGradient: "from-blue-600 to-sky-600",
    sections: [
      {
        title: "Type System Foundations & Narrowing",
        keyPoints: [
          "Discriminated Unions: Tagged union types for exhaustive pattern matching.",
          "Type Predicates (is): Custom type guard functions narrowing unknown shapes.",
          "Const Assertions (as const): Narrowing literal values to deeply readonly types.",
        ],
        importantTerms: ["Type Guard", "Discriminated Union", "Type Narrowing", "Exhaustiveness Check"],
      },
      {
        title: "Advanced Generics & Conditional Types",
        keyPoints: [
          "Conditional Types: T extends U ? X : Y for type-level computation.",
          "Infer Keyword: Deducing inner types within conditional clauses (e.g. ReturnType<T>).",
          "Template Literal Types: String manipulation at compile time (`on${Capitalize<Event>}`).",
        ],
        importantTerms: ["Infer Keyword", "Mapped Types", "Template Literal Types", "Utility Types"],
      },
    ],
  },
  {
    id: "redis-in-depth",
    title: "Redis Architecture & Caching",
    icon: "⚡",
    tag: "In-Memory Data",
    date: "2026-02-10",
    coverGradient: "from-red-500 to-amber-600",
    sections: [
      {
        title: "Redis Internals & Memory Management",
        keyPoints: [
          "Single-Threaded Event Loop: Multiplexed non-blocking I/O via epoll/kqueue.",
          "Data Structures: SDS (Simple Dynamic Strings), Skiplists, ZipLists, QuickLists.",
          "Eviction Policies: volatile-lru, allkeys-lru, noeviction when maxmemory is hit.",
        ],
        importantTerms: ["Skiplist", "ZipList", "LRU Eviction", "Epoll"],
      },
      {
        title: "High Availability & Distributed Caching",
        keyPoints: [
          "Persistence: RDB periodic snapshots + AOF append-only log with fsync policies.",
          "Redis Sentinel: Automatic failover and health monitoring for master-replica pairs.",
          "Redis Cluster: 16,384 hash slots distributed across master nodes for horizontal scale.",
        ],
        importantTerms: ["Hash Slot", "AOF", "RDB", "Sentinel", "Redlock"],
      },
    ],
  },
  {
    id: "git-internals",
    title: "Git Internals & Workflows",
    icon: "🌿",
    tag: "VCS & GitOps",
    date: "2026-01-10",
    coverGradient: "from-orange-600 to-red-600",
    sections: [
      {
        title: "Git Object Model (.git/objects)",
        keyPoints: [
          "Blob: Stores pure file content compressed with zlib, without metadata or file name.",
          "Tree: Stores directory structure, mapping file names and permissions to blob SHA-1 hashes.",
          "Commit: Points to a root tree, author info, timestamp, and parent commit SHA-1.",
          "Annotated Tag: Permanent pointer with message and GPG signature to a specific commit.",
        ],
        importantTerms: ["Content Addressable", "Blob", "Tree", "SHA-1 / SHA-256", "Packfile"],
      },
      {
        title: "Branching, Merging & Rebasing",
        keyPoints: [
          "Merge: Creates a 3-way merge commit combining divergent branch histories.",
          "Rebase: Replays commits from one branch onto another for a clean linear history.",
          "Git Reflog: Local safety log recording every HEAD update, allowing recovery of deleted commits.",
        ],
        importantTerms: ["Fast-Forward", "3-Way Merge", "Interactive Rebase", "Reflog"],
      },
    ],
  },
];
