export interface CoreSubjectQuestion {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  gfgUrl?: string;
  category: string;
}

export const coreSubjectsData: Record<string, CoreSubjectQuestion[]> = {
  "DBMS": [
    { id: "dbms1", title: "Explain ACID properties in database transactions", difficulty: "Easy", topic: "Transactions", category: "Fundamentals", gfgUrl: "https://www.geeksforgeeks.org/acid-properties-in-database-management-system/" },
    { id: "dbms2", title: "What is normalization? Explain 1NF, 2NF, 3NF, BCNF", difficulty: "Medium", topic: "Normalization", category: "Design", gfgUrl: "https://www.geeksforgeeks.org/normal-forms-in-database/" },
    { id: "dbms3", title: "Difference between INNER JOIN and OUTER JOIN", difficulty: "Easy", topic: "SQL Joins", category: "Queries", gfgUrl: "https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/" },
    { id: "dbms4", title: "What is indexing and how does it improve query performance?", difficulty: "Medium", topic: "Indexing", category: "Performance", gfgUrl: "https://www.geeksforgeeks.org/indexing-in-databases/" },
    { id: "dbms5", title: "Explain different types of database keys (Primary, Foreign, Candidate, Super)", difficulty: "Easy", topic: "Keys", category: "Fundamentals", gfgUrl: "https://www.geeksforgeeks.org/types-of-keys-in-relational-model/" },
    { id: "dbms6", title: "What is a transaction? Explain states of transaction", difficulty: "Easy", topic: "Transactions", category: "Fundamentals", gfgUrl: "https://www.geeksforgeeks.org/transaction-states-in-dbms/" },
    { id: "dbms7", title: "Explain difference between DELETE, TRUNCATE, and DROP", difficulty: "Easy", topic: "SQL Commands", category: "Queries", gfgUrl: "https://www.geeksforgeeks.org/difference-between-delete-drop-and-truncate/" },
    { id: "dbms8", title: "What is deadlock? How to prevent it in databases?", difficulty: "Medium", topic: "Concurrency", category: "Advanced", gfgUrl: "https://www.geeksforgeeks.org/deadlock-in-dbms/" },
    { id: "dbms9", title: "Explain difference between clustered and non-clustered index", difficulty: "Medium", topic: "Indexing", category: "Performance", gfgUrl: "https://www.geeksforgeeks.org/difference-between-clustered-and-non-clustered-index/" },
    { id: "dbms10", title: "What is database concurrency control? Explain locks", difficulty: "Medium", topic: "Concurrency", category: "Advanced", gfgUrl: "https://www.geeksforgeeks.org/concurrency-control-in-dbms/" },
    { id: "dbms11", title: "Explain difference between DBMS and RDBMS", difficulty: "Easy", topic: "Fundamentals", category: "Fundamentals", gfgUrl: "https://www.geeksforgeeks.org/difference-between-dbms-and-rdbms/" },
    { id: "dbms12", title: "What is database sharding? When to use it?", difficulty: "Hard", topic: "Scaling", category: "Advanced", gfgUrl: "https://www.geeksforgeeks.org/database-sharding/" },
    { id: "dbms13", title: "Explain difference between vertical and horizontal scaling in databases", difficulty: "Hard", topic: "Scaling", category: "Advanced", gfgUrl: "https://www.geeksforgeeks.org/horizontal-vs-vertical-scaling/" },
    { id: "dbms14", title: "What is a view in SQL? Advantages and disadvantages", difficulty: "Medium", topic: "SQL Views", category: "Queries", gfgUrl: "https://www.geeksforgeeks.org/sql-views/" },
    { id: "dbms15", title: "Explain difference between stored procedure and function", difficulty: "Medium", topic: "Stored Procedures", category: "Advanced", gfgUrl: "https://www.geeksforgeeks.org/difference-between-stored-procedure-and-function/" },
  ],
  "Operating Systems": [
    { id: "os1", title: "What is process synchronization? Explain semaphores", difficulty: "Medium", topic: "Process Synchronization", category: "Concurrency", gfgUrl: "https://www.geeksforgeeks.org/process-synchronization/" },
    { id: "os2", title: "Explain different CPU scheduling algorithms (FCFS, SJF, Round Robin, Priority)", difficulty: "Medium", topic: "CPU Scheduling", category: "Scheduling", gfgUrl: "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/" },
    { id: "os3", title: "What is deadlock? Explain necessary conditions (Coffman conditions)", difficulty: "Medium", topic: "Deadlock", category: "Concurrency", gfgUrl: "https://www.geeksforgeeks.org/deadlock-in-operating-systems/" },
    { id: "os4", title: "Difference between threads and processes", difficulty: "Easy", topic: "Process Management", category: "Fundamentals", gfgUrl: "https://www.geeksforgeeks.org/difference-between-process-and-thread/" },
    { id: "os5", title: "What is virtual memory and paging?", difficulty: "Medium", topic: "Memory Management", category: "Memory", gfgUrl: "https://www.geeksforgeeks.org/virtual-memory-in-operating-system/" },
    { id: "os6", title: "Explain Banker's algorithm for deadlock avoidance", difficulty: "Hard", topic: "Deadlock", category: "Concurrency", gfgUrl: "https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system/" },
    { id: "os7", title: "What is page replacement algorithm? Explain LRU, FIFO, Optimal", difficulty: "Medium", topic: "Memory Management", category: "Memory", gfgUrl: "https://www.geeksforgeeks.org/page-replacement-algorithms/" },
    { id: "os8", title: "Explain difference between preemptive and non-preemptive scheduling", difficulty: "Easy", topic: "CPU Scheduling", category: "Scheduling", gfgUrl: "https://www.geeksforgeeks.org/preemptive-vs-non-preemptive-scheduling/" },
    { id: "os9", title: "What is fragmentation? Internal vs External fragmentation", difficulty: "Medium", topic: "Memory Management", category: "Memory", gfgUrl: "https://www.geeksforgeeks.org/fragmentation-in-memory/" },
    { id: "os10", title: "Explain difference between multitasking, multiprogramming, and multiprocessing", difficulty: "Easy", topic: "Fundamentals", category: "Fundamentals", gfgUrl: "https://www.geeksforgeeks.org/multiprogramming-multitasking-multithreading-multiprocessing/" },
    { id: "os11", title: "What is a semaphore? Binary vs Counting semaphore", difficulty: "Medium", topic: "Process Synchronization", category: "Concurrency", gfgUrl: "https://www.geeksforgeeks.org/semaphores-in-process-synchronization/" },
    { id: "os12", title: "Explain producer-consumer problem and its solution", difficulty: "Hard", topic: "Process Synchronization", category: "Concurrency", gfgUrl: "https://www.geeksforgeeks.org/producers-consumers-problem-using-semaphores/" },
    { id: "os13", title: "What is thrashing? How to detect and prevent it?", difficulty: "Hard", topic: "Memory Management", category: "Memory", gfgUrl: "https://www.geeksforgeeks.org/thrashing-in-operating-system/" },
    { id: "os14", title: "Explain difference between static and dynamic memory allocation", difficulty: "Easy", topic: "Memory Management", category: "Memory", gfgUrl: "https://www.geeksforgeeks.org/static-vs-dynamic-memory-allocation/" },
    { id: "os15", title: "What is a zombie process? How to handle it?", difficulty: "Medium", topic: "Process Management", category: "Fundamentals", gfgUrl: "https://www.geeksforgeeks.org/zombie-and-orphan-processes/" },
  ],
  "Computer Networks": [
    { id: "cn1", title: "Explain the OSI model layers and their functions", difficulty: "Easy", topic: "OSI Model", category: "Fundamentals", gfgUrl: "https://www.geeksforgeeks.org/layers-of-osi-model/" },
    { id: "cn2", title: "What is the difference between TCP and UDP?", difficulty: "Easy", topic: "Transport Layer", category: "Protocols", gfgUrl: "https://www.geeksforgeeks.org/difference-between-tcp-and-udp/" },
    { id: "cn3", title: "How does DNS resolution work?", difficulty: "Medium", topic: "Application Layer", category: "Protocols", gfgUrl: "https://www.geeksforgeeks.org/how-dns-works/" },
    { id: "cn4", title: "Explain the three-way handshake in TCP", difficulty: "Medium", topic: "Transport Layer", category: "Protocols", gfgUrl: "https://www.geeksforgeeks.org/tcp-3-way-handshake/" },
    { id: "cn5", title: "What is the difference between HTTP and HTTPS?", difficulty: "Easy", topic: "Application Layer", category: "Protocols", gfgUrl: "https://www.geeksforgeeks.org/difference-between-http-and-https/" },
    { id: "cn6", title: "Explain difference between hub, switch, and router", difficulty: "Easy", topic: "Network Devices", category: "Hardware", gfgUrl: "https://www.geeksforgeeks.org/difference-between-hub-switch-and-router/" },
    { id: "cn7", title: "What is subnetting? How to calculate subnet mask?", difficulty: "Medium", topic: "Network Layer", category: "Addressing", gfgUrl: "https://www.geeksforgeeks.org/subnetting-in-network-layer/" },
    { id: "cn8", title: "Explain difference between IPv4 and IPv6", difficulty: "Easy", topic: "Network Layer", category: "Addressing", gfgUrl: "https://www.geeksforgeeks.org/difference-between-ipv4-and-ipv6/" },
    { id: "cn9", title: "What is a firewall? Types of firewalls", difficulty: "Medium", topic: "Network Security", category: "Security", gfgUrl: "https://www.geeksforgeeks.org/types-of-firewalls/" },
    { id: "cn10", title: "Explain difference between symmetric and asymmetric encryption", difficulty: "Medium", topic: "Network Security", category: "Security", gfgUrl: "https://www.geeksforgeeks.org/difference-between-symmetric-and-asymmetric-encryption/" },
    { id: "cn11", title: "What is NAT (Network Address Translation)?", difficulty: "Medium", topic: "Network Layer", category: "Addressing", gfgUrl: "https://www.geeksforgeeks.org/network-address-translation-nat/" },
    { id: "cn12", title: "Explain TCP congestion control mechanisms", difficulty: "Hard", topic: "Transport Layer", category: "Protocols", gfgUrl: "https://www.geeksforgeeks.org/tcp-congestion-control/" },
    { id: "cn13", title: "What is the difference between PUT and POST in HTTP?", difficulty: "Easy", topic: "Application Layer", category: "Protocols", gfgUrl: "https://www.geeksforgeeks.org/difference-between-put-and-post-method-in-http/" },
    { id: "cn14", title: "Explain how SSL/TLS handshake works", difficulty: "Hard", topic: "Network Security", category: "Security", gfgUrl: "https://www.geeksforgeeks.org/ssl-tls-handshake/" },
    { id: "cn15", title: "What is ARP? How does it work?", difficulty: "Medium", topic: "Network Layer", category: "Protocols", gfgUrl: "https://www.geeksforgeeks.org/address-resolution-protocol-arp/" },
  ],
  "OOP": [
    { id: "oop1", title: "Explain the four pillars of OOP (Encapsulation, Abstraction, Inheritance, Polymorphism)", difficulty: "Easy", topic: "Fundamentals", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/object-oriented-programming-in-java/" },
    { id: "oop2", title: "What is the difference between abstraction and encapsulation?", difficulty: "Easy", topic: "Abstraction", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/difference-between-abstraction-and-encapsulation/" },
    { id: "oop3", title: "Explain method overloading vs method overriding", difficulty: "Easy", topic: "Polymorphism", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/difference-between-method-overloading-and-method-overriding-in-java/" },
    { id: "oop4", title: "What is multiple inheritance and why is it not supported in Java?", difficulty: "Medium", topic: "Inheritance", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/why-multiple-inheritance-is-not-supported-in-java/" },
    { id: "oop5", title: "Explain the difference between abstract class and interface", difficulty: "Medium", topic: "Abstraction", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-java/" },
    { id: "oop6", title: "What is constructor overloading? Give examples", difficulty: "Easy", topic: "Constructors", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/constructor-overloading-in-java/" },
    { id: "oop7", title: "Explain difference between composition and inheritance", difficulty: "Medium", topic: "Inheritance", category: "Design Patterns", gfgUrl: "https://www.geeksforgeeks.org/composition-vs-inheritance-in-java/" },
    { id: "oop8", title: "What is the diamond problem in multiple inheritance?", difficulty: "Medium", topic: "Inheritance", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/diamond-problem-in-multiple-inheritance/" },
    { id: "oop9", title: "Explain access modifiers in Java (public, private, protected, default)", difficulty: "Easy", topic: "Encapsulation", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/access-modifiers-in-java/" },
    { id: "oop10", title: "What is the difference between static and instance methods?", difficulty: "Easy", topic: "Methods", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/difference-between-static-and-instance-method-in-java/" },
    { id: "oop11", title: "Explain SOLID principles of OOP design", difficulty: "Hard", topic: "Design Principles", category: "Design Patterns", gfgUrl: "https://www.geeksforgeeks.org/solid-principle-in-software-engineering/" },
    { id: "oop12", title: "What is the difference between deep copy and shallow copy?", difficulty: "Medium", topic: "Objects", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/deep-vs-shallow-copy-in-java/" },
    { id: "oop13", title: "Explain the difference between final, finally, and finalize in Java", difficulty: "Medium", topic: "Keywords", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/difference-between-final-finally-and-finalize-in-java/" },
    { id: "oop14", title: "What is the difference between == and equals() in Java?", difficulty: "Easy", topic: "Objects", category: "Core Concepts", gfgUrl: "https://www.geeksforgeeks.org/difference-between-equals-method-and-equality-operator-in-java/" },
    { id: "oop15", title: "Explain the difference between composition, aggregation, and association", difficulty: "Hard", topic: "Relationships", category: "Design Patterns", gfgUrl: "https://www.geeksforgeeks.org/difference-between-association-aggregation-and-composition-in-java/" },
  ],
};
