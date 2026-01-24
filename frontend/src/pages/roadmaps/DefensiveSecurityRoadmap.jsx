import React from 'react';
import RoadmapLayout from '../../components/roadmaps/RoadmapLayout.jsx';

const DEFENSIVE_SECURITY_ROADMAP = {
  "id": "defensive-security",
  "title": "🧭 Defensive Security Roadmap (Blue Team)",
  "description": "Learn how to defend systems, analyze logs, detect attacks, monitor threats, and operate real-world SOC (Security Operations Center) tools.",
  "short_description": "Master Blue Team skills including SIEM, EDR, network defense, threat detection, and incident response.",
  "prerequisites": ["Cyber Security Foundations", "Basic networking knowledge"],
  "estimated_hours": 140,
  "difficulty": "Intermediate to Advanced",
  "category": "Cyber Security",
  "phases": [
    {
      "phase": 1,
      "title": "Defensive Security Fundamentals",
      "goal": "Understand how defenders secure networks and systems",
      "weeks": "Week 6-7",
      "topics": [
        "What is Blue Teaming?",
        "Security Operations Center (SOC) structure",
        "Incident Response Life Cycle",
        "Defense-in-depth model",
        "Zero Trust Architecture",
        "MITRE ATT&CK Framework",
        "Cyber Kill Chain"
      ],
      "practice": [
        "Map cyber attacks to MITRE techniques",
        "Analyze sample SOC incident reports",
        "Create your own cyber kill chain diagram"
      ]
    },
    {
      "phase": 2,
      "title": "SIEM (Security Information & Event Management)",
      "goal": "Learn how to detect threats using SIEM tools",
      "weeks": "Week 7-8",
      "topics": [
        "SIEM basics and architecture",
        "Logs & event types",
        "Log correlation techniques",
        "Alerts & rule creation",
        "Threat Intelligence feeds integration",
        "Tools: Splunk, ELK Stack, IBM QRadar, Microsoft Sentinel"
      ],
      "practice": [
        "Install Splunk free version OR use online labs",
        "Create log dashboard",
        "Detect failed login brute force attempts",
        "Build alert rule for suspicious traffic"
      ]
    },
    {
      "phase": 3,
      "title": "Endpoint Security",
      "goal": "Protect endpoints (Windows/Linux) from malware & attacks",
      "weeks": "Week 8-9",
      "topics": [
        "EDR (Endpoint Detection & Response)",
        "Antivirus vs EDR vs MDR",
        "Windows Defender logs analysis",
        "Sysmon installation & configuration",
        "Malware behavior indicators",
        "Memory analysis basics",
        "Sandboxing techniques"
      ],
      "practice": [
        "Install Sysmon on Windows",
        "Capture logs for process creation",
        "Detect suspicious PowerShell commands",
        "Analyze sample malware behavior in a sandbox"
      ]
    },
    {
      "phase": 4,
      "title": "Network Defense",
      "goal": "Secure networks using firewalls, IDS/IPS & packet monitoring",
      "weeks": "Week 9-10",
      "topics": [
        "Firewalls (WAF, NGFW)",
        "IDS vs IPS (Snort, Suricata)",
        "VLANs, DMZ, segmentation",
        "Network Access Control (NAC)",
        "VPN & tunneling security",
        "Proxy & secure gateways",
        "Detecting MITM attacks",
        "Wireshark advanced filters",
        "Spotting DDoS, scans, injections"
      ],
      "practice": [
        "Set up Snort or Suricata in VM",
        "Detect port scanning using Nmap + IDS",
        "Capture & analyze suspicious packets",
        "Configure firewall inbound/outbound rules"
      ]
    },
    {
      "phase": 5,
      "title": "Windows & Active Directory Defense",
      "goal": "Learn to defend corporate environments",
      "weeks": "Week 10-11",
      "topics": [
        "Windows Security Architecture",
        "Active Directory Basics",
        "Domain Controllers security",
        "Kerberos Authentication",
        "Group Policies (GPO)",
        "Common AD attacks: Pass-the-Hash, Pass-the-Ticket",
        "Kerberoasting detection",
        "Golden ticket attacks"
      ],
      "practice": [
        "Build mini Active Directory lab (local VM)",
        "Monitor event logs (4624, 4625, 4769, 4720)",
        "Detect brute-force login attempts",
        "Create GPO to restrict PowerShell usage"
      ]
    },
    {
      "phase": 6,
      "title": "Threat Detection & Incident Response",
      "goal": "Detect real-world attacks & respond professionally",
      "weeks": "Week 11-12",
      "topics": [
        "Log analysis workflow",
        "Threat hunting basics",
        "Indicators of Compromise (IOCs)",
        "Memory forensics intro",
        "Incident response playbooks",
        "Creating detection rules",
        "Root cause analysis",
        "Reporting formats (executive + technical)"
      ],
      "practice": [
        "Analyze sample ransomware logs",
        "Perform threat hunt for suspicious PowerShell commands",
        "Write incident report for simulated attack",
        "Build detection rule for privilege escalation"
      ]
    }
  ],
  "mini_projects": [
    {
      "name": "Build SIEM Dashboard",
      "description": "Create comprehensive dashboard for failed logins and suspicious network traffic",
      "technologies": ["SIEM", "Log Analysis", "Dashboards"],
      "type": "monitoring",
      "difficulty": "Intermediate"
    },
    {
      "name": "Configure IDS/IPS Lab",
      "description": "Set up and configure IDS/IPS to detect Nmap scans and suspicious packets",
      "technologies": ["Snort", "Suricata", "Network Security"],
      "type": "network-defense",
      "difficulty": "Advanced"
    },
    {
      "name": "Windows Security Project",
      "description": "Install Sysmon and create detection rules for malicious activities",
      "technologies": ["Sysmon", "Windows Security", "EDR"],
      "type": "endpoint-security",
      "difficulty": "Intermediate"
    },
    {
      "name": "Threat Hunting Project",
      "description": "Hunt for malicious PowerShell activities and suspicious commands",
      "technologies": ["Threat Hunting", "PowerShell", "IOCs"],
      "type": "detection",
      "difficulty": "Advanced"
    },
    {
      "name": "Incident Response Simulation",
      "description": "Analyze attack logs and write comprehensive incident response report",
      "technologies": ["Incident Response", "Forensics", "Reporting"],
      "type": "response",
      "difficulty": "Advanced"
    },
    {
      "name": "Active Directory Defense Lab",
      "description": "Build and secure Active Directory environment with monitoring",
      "technologies": ["Active Directory", "GPO", "Windows Security"],
      "type": "corporate-defense",
      "difficulty": "Intermediate"
    }
  ],
  "daily_plan": [
    {
      "time": "0-30 mins",
      "task": "Learn topic",
      "example": "Watch SIEM / EDR tutorials"
    },
    {
      "time": "30-90 mins",
      "task": "Hands-on practice",
      "example": "Analyze logs, detect attacks"
    },
    {
      "time": "90-120 mins",
      "task": "Project",
      "example": "Build dashboards / write reports"
    }
  ],
  "tools": [
    "Splunk / ELK / Sentinel",
    "Wireshark",
    "Sysmon",
    "Snort / Suricata",
    "Windows Event Viewer",
    "Nessus (basic scans)",
    "TheHive (Incident Response)"
  ],
  "outcome": "By the end of this roadmap, you'll be able to detect cyber attacks using SIEM, use IDS/IPS & packet filters, analyze Windows & Linux logs, perform threat hunting, monitor Active Directory, write professional Incident Response reports, and be ready for Web & App Security.",
  "career_paths": [
    "SOC Analyst",
    "Security Operations Center Analyst",
    "Incident Responder",
    "Threat Hunter",
    "Cybersecurity Analyst",
    "Network Security Engineer",
    "Endpoint Security Specialist",
    "SIEM Engineer",
    "Blue Team Operator",
    "Security Monitoring Analyst"
  ]
};

const DefensiveSecurityRoadmap = () => {
  return <RoadmapLayout data={DEFENSIVE_SECURITY_ROADMAP} roadmapId={DEFENSIVE_SECURITY_ROADMAP.id} />;
};

export default DefensiveSecurityRoadmap;
