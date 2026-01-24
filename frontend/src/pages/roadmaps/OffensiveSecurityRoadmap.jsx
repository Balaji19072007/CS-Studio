import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const OFFENSIVE_SECURITY_ROADMAP = {
  "id": "offensive-security",
  "title": "🧭 Offensive Security & Red Teaming Roadmap",
  "description": "Become skilled in ethical hacking, penetration testing, and red teaming — including reconnaissance, exploitation, privilege escalation, lateral movement, and advanced attack techniques.",
  "short_description": "Master ethical hacking, penetration testing, red teaming, and advanced attack methodologies.",
  "prerequisites": ["Cyber Security Foundations", "Basic networking knowledge", "Linux command line"],
  "estimated_hours": 160,
  "difficulty": "Advanced",
  "category": "Cyber Security",
  "phases": [
    {
      "phase": 1,
      "title": "Ethical Hacking & Red Team Basics",
      "goal": "Learn what red teaming is and understand attack methodologies",
      "weeks": "Week 12-13",
      "topics": [
        "What is Penetration Testing?",
        "What is Red Teaming?",
        "Red Team vs Blue Team vs Purple Team",
        "Rules of Engagement (RoE)",
        "Legal & ethical boundaries",
        "PenTest Phases: Reconnaissance, Scanning, Exploitation",
        "Privilege Escalation, Persistence, Lateral Movement",
        "Covering Tracks techniques",
        "MITRE ATT&CK for Red Team",
        "Cyber Kill Chain for attackers"
      ],
      "practice": [
        "Create a red team attack plan",
        "Map attack steps to MITRE ATT&CK",
        "Analyze 3 real-world attacks (case studies)"
      ]
    },
    {
      "phase": 2,
      "title": "Reconnaissance & Scanning",
      "goal": "Learn passive and active recon techniques",
      "weeks": "Week 13-14",
      "topics": [
        "OSINT techniques",
        "Whois lookup methods",
        "Shodan for device discovery",
        "Subdomain enumeration (Subfinder, Amass)",
        "Technology discovery with BuiltWith & Wappalyzer",
        "DNS enumeration techniques",
        "Port scanning with Nmap",
        "Service enumeration and banner grabbing",
        "Network mapping methodologies",
        "Vulnerability scanning with Nessus, OpenVAS, Nikto"
      ],
      "practice": [
        "Enumerate 10 subdomains of a test site",
        "Scan host using Nmap (all ports, scripts)",
        "Perform vulnerability scan in Nessus",
        "Gather OSINT data on a dummy target"
      ]
    },
    {
      "phase": 3,
      "title": "Exploitation",
      "goal": "Exploit vulnerable systems using common tools & frameworks",
      "weeks": "Week 14-16",
      "topics": [
        "Metasploit Framework usage",
        "Searchsploit / Exploit-DB research",
        "Burp Suite for web application testing",
        "SQLmap for automated SQL injection",
        "Reverse shells and bind shells",
        "Payload generation with msfvenom",
        "Web application vulnerabilities exploitation",
        "Server misconfigurations exploitation",
        "SMB and FTP service exploitation",
        "Remote code execution (RCE) techniques",
        "Exploiting outdated software vulnerabilities"
      ],
      "practice": [
        "Exploit vulnerabilities in Metasploitable 2",
        "Perform SQL injection using SQLmap",
        "Gain reverse shell access via misconfigurations",
        "Exploit vulnerable WordPress site locally"
      ]
    },
    {
      "phase": 4,
      "title": "Privilege Escalation",
      "goal": "Gain admin/root access after initial compromise",
      "weeks": "Week 16-17",
      "topics": [
        "Linux Privilege Escalation: SUID/SGID binaries",
        "Cron job abuse techniques",
        "Weak file permissions exploitation",
        "PATH hijacking methods",
        "Kernel exploits research and usage",
        "Misconfigured sudo exploitation",
        "Windows Privilege Escalation: Unquoted service paths",
        "UAC bypass techniques",
        "Token impersonation attacks",
        "Vulnerable service abuse",
        "Credential dumping with Mimikatz",
        "LSA secrets extraction",
        "Post-Exploitation enumeration scripts (LinPEAS, WinPEAS)",
        "Hash dumping and SSH key harvesting"
      ],
      "practice": [
        "Use LinPEAS to find Linux privesc paths",
        "Dump Windows passwords using Mimikatz",
        "Exploit a vulnerable scheduled task",
        "Elevate to root/admin on a test machine"
      ]
    },
    {
      "phase": 5,
      "title": "Lateral Movement & Persistence",
      "goal": "Move through networks and maintain long-term access",
      "weeks": "Week 17-18",
      "topics": [
        "Pivoting and tunneling techniques",
        "SOCKS proxies setup and usage",
        "SSH tunneling for network access",
        "RDP session hijacking methods",
        "Creating persistence mechanisms",
        "Credential harvesting techniques",
        "Pass-the-Hash attacks",
        "Pass-the-Ticket attacks",
        "Kerberos abuses (Golden Ticket)",
        "Active Directory lateral movement",
        "WMI and PowerShell for movement"
      ],
      "practice": [
        "Create persistence on Windows test VM",
        "Perform SSH pivoting between systems",
        "Simulate lateral movement between 2 VMs",
        "Use Rubeus for Kerberos attacks"
      ]
    },
    {
      "phase": 6,
      "title": "Advanced Red Teaming",
      "goal": "Perform full attack chains with stealth techniques",
      "weeks": "Week 18-20",
      "topics": [
        "AV/EDR evasion basics",
        "Payload obfuscation and encoding",
        "Living Off The Land attacks (LOLBins)",
        "PowerShell weaponization techniques",
        "Phishing campaign development",
        "Social engineering basics",
        "OSINT + payload delivery methods",
        "Maintaining covert access",
        "Safe data exfiltration techniques",
        "Red Team reporting standards",
        "Executive summary writing",
        "Technical details documentation",
        "Remediation steps development",
        "Severity scoring methodologies"
      ],
      "practice": [
        "Build your own phishing HTML page",
        "Evade simple antivirus with msfvenom obfuscation",
        "Complete a full attack chain on a lab environment",
        "Write a Red Team operation report"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Complete Penetration Test on Metasploitable 2",
      "description": "Perform full penetration test from reconnaissance to exploitation on Metasploitable 2",
      "technologies": ["Metasploit", "Nmap", "Manual Exploitation"],
      "type": "pentesting",
      "difficulty": "Intermediate"
    },
    {
      "name": "Privilege Escalation Challenge on HackTheBox",
      "description": "Complete privilege escalation challenges on HackTheBox machines",
      "technologies": ["Linux/Windows PrivEsc", "Enumeration", "Exploitation"],
      "type": "challenge",
      "difficulty": "Advanced"
    },
    {
      "name": "Red Team Operation Report",
      "description": "Write comprehensive red team operation report with full attack chain documentation",
      "technologies": ["Reporting", "Documentation", "Attack Analysis"],
      "type": "documentation",
      "difficulty": "Intermediate"
    },
    {
      "name": "OSINT Recon Project",
      "description": "Perform comprehensive OSINT reconnaissance and target profiling",
      "technologies": ["OSINT", "Reconnaissance", "Target Analysis"],
      "type": "intelligence",
      "difficulty": "Intermediate"
    },
    {
      "name": "AD Attack Simulation",
      "description": "Simulate Active Directory attacks including Kerberoasting and Pass-the-Hash",
      "technologies": ["Active Directory", "Kerberos", "Lateral Movement"],
      "type": "simulation",
      "difficulty": "Advanced"
    },
    {
      "name": "Custom Reverse Shell Script",
      "description": "Develop custom reverse shell script with evasion capabilities",
      "technologies": ["Scripting", "Payload Development", "Evasion"],
      "type": "development",
      "difficulty": "Advanced"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "Exploitation / OSINT lessons"
    },
    {
      "time": "30-90 mins",
      "task": "Practice labs",
      "example": "TryHackMe, HTB, DVWA"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Exploitation, privesc, reporting"
    }
  ],
  "tools": [
    "Kali Linux",
    "Metasploit Framework",
    "Nmap",
    "Burp Suite",
    "SQLmap",
    "LinPEAS / WinPEAS",
    "Mimikatz",
    "Hydra",
    "John the Ripper",
    "BloodHound (AD)",
    "PowerShell Empire",
    "Covenant C2",
    "Impacket Tools",
    "Responder"
  ],
  "labs": [
    "TryHackMe (Beginner/Intermediate Rooms)",
    "HackTheBox (Easy/Medium Machines)",
    "Metasploitable 2",
    "VulnHub Machines",
    "Attack-Defense Labs",
    "PentesterLab"
  ],
  "outcome": "By the end of this roadmap, you'll be able to perform reconnaissance, scanning & exploitation, gain shells & escalate privileges, attack Windows & Linux machines, use Metasploit & manual exploitation, perform pivoting & lateral movement, write full attack reports, and be ready for Incident Response & Forensics.",
  "career_paths": [
    "Penetration Tester",
    "Red Team Operator",
    "Ethical Hacker",
    "Vulnerability Assessor",
    "Security Consultant (Offensive)",
    "Exploit Developer",
    "Adversarial Emulation Specialist",
    "Network Penetration Tester",
    "Web Application Penetration Tester",
    "Social Engineering Specialist"
  ]
};

const OffensiveSecurityRoadmap = () => {
  return <RoadmapLayout data={OFFENSIVE_SECURITY_ROADMAP} roadmapId={OFFENSIVE_SECURITY_ROADMAP.id} />;
};

export default OffensiveSecurityRoadmap;
