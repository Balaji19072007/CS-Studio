import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const FORENSICS_INCIDENT_RESPONSE_ROADMAP = {
  "id": "forensics-incident-response",
  "title": "🧭 Forensics & Incident Response Roadmap",
  "description": "Learn to investigate cyber attacks, analyze malware, recover evidence, perform incident response, and work like a real DFIR (Digital Forensics & Incident Response) analyst.",
  "short_description": "Master digital forensics, incident response, malware analysis, and cyber attack investigation techniques.",
  "prerequisites": ["Cyber Security Foundations", "Basic networking knowledge", "Windows/Linux basics"],
  "estimated_hours": 140,
  "difficulty": "Intermediate to Advanced",
  "category": "Cyber Security",
  "phases": [
    {
      "phase": 1,
      "title": "DFIR Fundamentals",
      "goal": "Understand incident response, digital evidence, and forensic workflow",
      "weeks": "Week 16-17",
      "topics": [
        "What is Digital Forensics?",
        "What is Incident Response?",
        "DFIR roles: Forensic Analyst, IR Analyst",
        "Chain of custody procedures",
        "Evidence acquisition methods",
        "Volatile vs non-volatile data",
        "Incident Response Life Cycle: Preparation, Identification",
        "Containment, Eradication, Recovery, Lessons Learned",
        "Legal and ethical considerations",
        "Forensic workstation setup"
      ],
      "practice": [
        "Create sample IR playbook",
        "Practice chain of custody documentation",
        "Identify types of digital evidence",
        "Set up forensic workstation"
      ]
    },
    {
      "phase": 2,
      "title": "Disk Forensics",
      "goal": "Analyze file systems, deleted data, partitions, and file artifacts",
      "weeks": "Week 17-18",
      "topics": [
        "File systems: NTFS, FAT32, ext4 analysis",
        "File metadata analysis techniques",
        "Disk imaging (dd, FTK Imager)",
        "Hashing data (MD5, SHA256) for integrity",
        "Recovering deleted files and partitions",
        "Partition table analysis",
        "Windows artifacts: Recycle Bin analysis",
        "Jump Lists and Prefetch files",
        "Browser history extraction",
        "Recent documents and user activity",
        "Timeline analysis techniques"
      ],
      "practice": [
        "Create disk image of a test VM",
        "Recover deleted files from image",
        "Analyze NTFS metadata and MFT",
        "Extract browser activity and history"
      ]
    },
    {
      "phase": 3,
      "title": "Memory Forensics",
      "goal": "Analyze RAM dumps to detect malware & intruder activity",
      "weeks": "Week 18-19",
      "topics": [
        "Volatile memory fundamentals",
        "RAM imaging techniques and tools",
        "Memory artifacts analysis",
        "Running processes enumeration",
        "Loaded DLLs and modules analysis",
        "Network connections in memory",
        "Command history extraction",
        "Malicious code indicators in RAM",
        "Finding injected processes and code",
        "Extracting strings and data from memory",
        "Malware persistence detection"
      ],
      "practice": [
        "Capture memory image of test VM",
        "Analyze RAM using Volatility Framework",
        "Detect injected processes and code",
        "Extract attacker commands from memory"
      ]
    },
    {
      "phase": 4,
      "title": "Log & Network Forensics",
      "goal": "Investigate logs and network traffic to trace attackers",
      "weeks": "Week 19-20",
      "topics": [
        "Windows Event Logs analysis",
        "Sysmon logs and configuration",
        "Authentication logs investigation",
        "PowerShell logs and script analysis",
        "VPN and remote access logs",
        "Web server logs (Apache/Nginx)",
        "Packet analysis with Wireshark",
        "PCAP analysis techniques",
        "Detecting C2 communication patterns",
        "DNS-based attacks investigation",
        "Beaconing patterns identification",
        "DDoS attack detection",
        "MITM attack investigation",
        "Timeline reconstruction from logs"
      ],
      "practice": [
        "Analyze PCAP for suspicious traffic",
        "Detect brute-force attempts in logs",
        "Reconstruct attack timeline from logs",
        "Identify malicious IPs and domains"
      ]
    },
    {
      "phase": 5,
      "title": "Malware Analysis",
      "goal": "Analyze, classify, and document malware behavior",
      "weeks": "Week 20-21",
      "topics": [
        "Static Analysis: File signatures",
        "Hashing malware samples",
        "Unpacking techniques basics",
        "Strings analysis and extraction",
        "PE file structure analysis",
        "Dynamic Analysis in sandbox",
        "API call monitoring",
        "Registry modifications tracking",
        "File system changes monitoring",
        "Network behavior analysis",
        "Malware Types: Ransomware analysis",
        "Backdoors and Trojans investigation",
        "Worms and Keyloggers behavior",
        "Rootkits detection techniques",
        "Indicators of Compromise (IOCs) extraction"
      ],
      "practice": [
        "Analyze sample malware in a sandbox",
        "Identify persistence mechanisms",
        "Extract indicators of compromise (IOCs)",
        "Create malware behavior analysis report"
      ]
    },
    {
      "phase": 6,
      "title": "Full Incident Response & Reporting",
      "goal": "Handle and professionally document a cyber incident",
      "weeks": "Week 21-22",
      "topics": [
        "Breach identification techniques",
        "Triage process and prioritization",
        "Evidence preservation methods",
        "Threat containment strategies",
        "Root-cause analysis methodologies",
        "Eradication steps and verification",
        "Communication templates and protocols",
        "Executive reporting for management",
        "Technical documentation standards",
        "IR playbooks creation and maintenance",
        "Lessons learned documentation",
        "Remediation recommendations",
        "Legal and compliance considerations"
      ],
      "practice": [
        "Perform full IR simulation exercise",
        "Create executive summary report",
        "Create technical attack timeline",
        "Document IOCs and recommendations"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "PCAP Forensic Report",
      "description": "Analyze network capture files and create comprehensive forensic report",
      "technologies": ["Wireshark", "Network Forensics", "PCAP Analysis"],
      "type": "network-forensics",
      "difficulty": "Intermediate"
    },
    {
      "name": "Disk Forensic Lab (Autopsy)",
      "description": "Perform complete disk forensic analysis using Autopsy tool",
      "technologies": ["Autopsy", "Disk Forensics", "File Recovery"],
      "type": "disk-forensics",
      "difficulty": "Intermediate"
    },
    {
      "name": "Memory Analysis with Volatility",
      "description": "Analyze memory dumps to detect malware and attacker activity",
      "technologies": ["Volatility", "Memory Forensics", "Malware Detection"],
      "type": "memory-forensics",
      "difficulty": "Advanced"
    },
    {
      "name": "Log Analysis Investigation",
      "description": "Investigate security incidents through comprehensive log analysis",
      "technologies": ["SIEM", "Log Analysis", "Event Correlation"],
      "type": "log-forensics",
      "difficulty": "Intermediate"
    },
    {
      "name": "Malware Sandbox Analysis Report",
      "description": "Analyze malware behavior in sandbox and document findings",
      "technologies": ["Sandbox Analysis", "Malware Research", "IOC Extraction"],
      "type": "malware-analysis",
      "difficulty": "Advanced"
    },
    {
      "name": "Full Incident Response Case Study",
      "description": "Complete end-to-end incident response simulation and reporting",
      "technologies": ["Incident Response", "Forensics", "Reporting"],
      "type": "incident-response",
      "difficulty": "Advanced"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "Forensics / IR videos"
    },
    {
      "time": "30-90 mins",
      "task": "Hands-on analysis",
      "example": "PCAP, logs, memory dumps"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "IR reports, malware analysis"
    }
  ],
  "tools": [
    "Autopsy",
    "FTK Imager",
    "Sleuth Kit",
    "Volatility Framework",
    "Redline",
    "Wireshark",
    "Elastic Stack",
    "ProcMon",
    "Any.Run",
    "Cuckoo Sandbox",
    "Plaso",
    "Log2Timeline",
    "YARA",
    "GRR"
  ],
  "labs": [
    "SANS DFIR Challenges",
    "Cyberseclabs Forensics",
    "TryHackMe Forensics Rooms",
    "HackTheBox Forensics",
    "Forensics Wiki Challenges",
    "Digital Corpora"
  ],
  "outcome": "By the end of this roadmap, you'll be able to perform DFIR investigations, analyze disk, memory, and network artifacts, investigate Windows & Linux incidents, perform malware analysis, build complete incident response reports, and work as SOC Analyst Level 2 or DFIR Analyst.",
  "career_paths": [
    "Digital Forensics Analyst",
    "Incident Response Analyst",
    "DFIR Specialist",
    "SOC Analyst Level 2",
    "Malware Analyst",
    "Cyber Crime Investigator",
    "Forensic Consultant",
    "Incident Handler",
    "Threat Intelligence Analyst",
    "Computer Forensic Examiner"
  ]
};

const ForensicsIncidentResponseRoadmap = () => {
  return <RoadmapLayout data={FORENSICS_INCIDENT_RESPONSE_ROADMAP} roadmapId={FORENSICS_INCIDENT_RESPONSE_ROADMAP.id} />;
};

export default ForensicsIncidentResponseRoadmap;
