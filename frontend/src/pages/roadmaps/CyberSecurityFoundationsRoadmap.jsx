import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const CYBER_SECURITY_FOUNDATIONS_ROADMAP = {
  "id": "cyber-security-foundations",
  "title": "🧭 Cyber Security Foundations & Networking Roadmap",
  "description": "Understand the core fundamentals of cybersecurity, computer networking, operating systems, Linux, protocols, ports, and how the internet works — the base for all future cyber security skills.",
  "short_description": "Master cybersecurity fundamentals, networking, Linux, and essential security tools for cyber operations.",
  "prerequisites": ["Basic computer literacy"],
  "estimated_hours": 120,
  "difficulty": "Beginner to Intermediate",
  "category": "Cyber Security",
  "phases": [
    {
      "phase": 1,
      "title": "Cyber Security Basics",
      "goal": "Learn what cybersecurity is and understand key terminologies",
      "weeks": "Week 1",
      "topics": [
        "What is Cyber Security?",
        "CIA Triad (Confidentiality, Integrity, Availability)",
        "Threats, vulnerabilities, exploits",
        "Types of attacks (Malware, DoS, MITM, Phishing)",
        "Security domains (network, web, cloud, application, forensic)",
        "Blue Team vs Red Team",
        "SOC (Security Operations Center) basics"
      ],
      "practice": [
        "Identify cyber attacks from real-world cases",
        "Analyze simple phishing emails (samples online)",
        "Find vulnerabilities from news headlines"
      ]
    },
    {
      "phase": 2,
      "title": "Linux & Command Line",
      "goal": "Learn Linux as it is essential for cyber operations",
      "weeks": "Week 1-2",
      "topics": [
        "Linux installation (Ubuntu/Kali in VM)",
        "Basic commands (ls, cd, cp, mv, rm)",
        "Users, permissions, groups",
        "File system & directories",
        "Package management (apt)",
        "Shell scripting basics",
        "Networking tools: ping, ifconfig, ip, netstat, ss, dig, traceroute"
      ],
      "practice": [
        "Install Kali Linux in VirtualBox",
        "Run 20 Linux commands",
        "Create + modify files using CLI",
        "Write a simple bash script"
      ]
    },
    {
      "phase": 3,
      "title": "Networking Essentials",
      "goal": "Master how the internet works — required for hacking & defense",
      "weeks": "Week 2-4",
      "topics": [
        "OSI Model (7 layers)",
        "TCP/IP Model",
        "IP Addressing (IPv4, IPv6)",
        "Subnets & CIDR notations",
        "DHCP, DNS, ARP, NAT",
        "Public vs Private IP",
        "TCP vs UDP protocols",
        "Ports & services (SSH, FTP, DNS, HTTP, HTTPS)",
        "Firewalls & routing basics",
        "Wireshark basics and packet structure",
        "Filtering and analyzing packets",
        "Analyzing HTTP/HTTPS, DNS packets"
      ],
      "practice": [
        "Capture your own packets in Wireshark",
        "Analyze DNS lookup traffic",
        "Identify source/destination IPs",
        "Create simple network diagram"
      ]
    },
    {
      "phase": 4,
      "title": "System & OS Concepts",
      "goal": "Understand Windows & Linux internals",
      "weeks": "Week 4-5",
      "topics": [
        "Windows file system & registry",
        "Processes, threads management",
        "Memory management concepts",
        "Services and startup programs",
        "Windows CMD & PowerShell basics",
        "Event Viewer logs analysis",
        "Linux vs Windows differences"
      ],
      "practice": [
        "Monitor Windows processes using Task Manager",
        "View logs in Event Viewer",
        "Create and kill processes in Linux",
        "Write a simple PowerShell script"
      ]
    },
    {
      "phase": 5,
      "title": "Introduction to Security Tools",
      "goal": "Use basic cyber tools before moving to defensive/offensive security",
      "weeks": "Week 5-6",
      "topics": [
        "Nmap (basic scanning techniques)",
        "Wireshark (packet sniffing advanced)",
        "Burp Suite (intro and setup)",
        "Browser developer tools for security",
        "Password cracking basics (John the Ripper intro)",
        "VPN and Proxychains basics",
        "Hashing vs Encryption fundamentals"
      ],
      "practice": [
        "Scan local network using Nmap",
        "Find open ports on your own machine",
        "Capture HTTP login request in Wireshark",
        "Use John to crack weak password hashes (demo level)"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Network Mapping Project",
      "description": "Discover devices on your network and create comprehensive network diagram",
      "technologies": ["Nmap", "Network Diagrams", "Discovery"],
      "type": "networking",
      "difficulty": "Beginner"
    },
    {
      "name": "Packet Analysis Project",
      "description": "Capture DNS, HTTP, ARP packets and create detailed analysis report",
      "technologies": ["Wireshark", "Packet Analysis", "Protocols"],
      "type": "analysis",
      "difficulty": "Intermediate"
    },
    {
      "name": "Linux Automation Script",
      "description": "Write bash script to scan ports, analyze results and save outputs",
      "technologies": ["Bash Scripting", "Automation", "Linux"],
      "type": "scripting",
      "difficulty": "Intermediate"
    },
    {
      "name": "Security Terminology Dictionary",
      "description": "Build your own comprehensive glossary of 50+ cyber security terms",
      "technologies": ["Documentation", "Research", "Learning"],
      "type": "education",
      "difficulty": "Beginner"
    },
    {
      "name": "OS Comparison Report",
      "description": "Compare Windows and Linux security features and differences",
      "technologies": ["Windows", "Linux", "Security"],
      "type": "research",
      "difficulty": "Beginner"
    },
    {
      "name": "Tool Proficiency Portfolio",
      "description": "Document your proficiency with Nmap, Wireshark, and basic security tools",
      "technologies": ["Nmap", "Wireshark", "Documentation"],
      "type": "portfolio",
      "difficulty": "Intermediate"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn new topic",
      "example": "Watch Linux/Network tutorial"
    },
    {
      "time": "30-90 mins",
      "task": "Practice hands-on",
      "example": "Run commands, scan network"
    },
    {
      "time": "90-120 mins",
      "task": "Mini project",
      "example": "Packet capture, scan, diagrams"
    }
  ],
  "tools": [
    "Kali Linux / Ubuntu",
    "VirtualBox / VMware",
    "Wireshark",
    "Nmap",
    "PowerShell",
    "Burp Suite (Community)",
    "John the Ripper",
    "Draw.io (network diagrams)"
  ],
  "outcome": "By the end of this roadmap, you'll understand Linux & command-line basics, how networks, IPs, DNS, packets work, Wireshark & Nmap fundamentals, Windows & Linux OS structure, core cybersecurity concepts, and be ready for Defensive Security.",
  "career_paths": [
    "Cyber Security Analyst",
    "SOC Analyst",
    "Network Security Specialist",
    "Security Operations Center Technician",
    "IT Security Specialist",
    "Vulnerability Analyst",
    "Security Consultant (Entry Level)",
    "Incident Response Analyst"
  ]
};

const CyberSecurityFoundationsRoadmap = () => {
  return <RoadmapLayout data={CYBER_SECURITY_FOUNDATIONS_ROADMAP} roadmapId={CYBER_SECURITY_FOUNDATIONS_ROADMAP.id} />;
};

export default CyberSecurityFoundationsRoadmap;
