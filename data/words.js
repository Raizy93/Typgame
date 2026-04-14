'use strict';

/**
 * data/words.js – TypGame Cyber Security
 *
 * Woordenlijst met cybersecurity-termen, ingedeeld op moeilijkheid.
 * WordList.getWordsForLevel(level) geeft een pool terug op basis van level:
 *   level 1-2 → korte woorden (3-5 letters)
 *   level 3-4 → middellange woorden (4-7 letters)
 *   level 5+  → alle woorden inclusief lange termen
 */

const WordList = (() => {
  const short = [
    'hack', 'byte', 'port', 'root', 'key',
    'ssh', 'sql', 'dns', 'ftp', 'vpn',
    'bug', 'log', 'tor', 'ip', 'mac',
    'api', 'xss', 'raw', 'net', 'scan',
    'dos', 'bot', 'hex', 'ssl', 'tls',
  ];

  const medium = [
    'virus', 'trojan', 'patch', 'proxy', 'token',
    'login', 'admin', 'worm', 'flood', 'spoof',
    'crack', 'brute', 'pivot', 'fuzzy', 'shell',
    'sniff', 'audit', 'alert', 'block', 'chain',
    'cipher', 'cookie', 'daemon', 'debug', 'encode',
    'inject', 'kernel', 'reboot', 'socket', 'tunnel',
  ];

  const hard = [
    'firewall', 'malware', 'exploit', 'payload', 'botnet',
    'phishing', 'rootkit', 'sandbox', 'keylog', 'bypass',
    'backdoor', 'checksum', 'deadlock', 'endpoint', 'gateway',
    'honeypot', 'intruder', 'jailbreak', 'lockdown', 'monitor',
    'overflow', 'protocol', 'redirect', 'spoofing', 'traceroute',
    'zero-day', 'hashcode', 'pentest', 'stealth', 'intrusion',
  ];

  const expert = [
    'ransomware', 'cryptojack', 'privilege', 'exfiltrate',
    'obfuscate', 'shellcode', 'stuxnet', 'darkweb',
    'mitm-attack', 'bruteforce', 'polymorphic', 'cryptoworm',
    'persistence', 'sideloading', 'fingerprint', 'eavesdrop',
  ];

  return {
    /**
     * Geeft een woordpool terug passend bij het opgegeven level.
     * @param {number} level
     * @returns {string[]}
     */
    getWordsForLevel(level) {
      if (level <= 2) return short;
      if (level <= 4) return [...short, ...medium];
      if (level <= 6) return [...medium, ...hard];
      return [...hard, ...expert];
    }
  };
})();
