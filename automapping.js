const { DNS } = require('dns2');
const net = require('net');

// Only 10 main providers
const mainProviders = {
  'gmail.com': { host: 'smtp.gmail.com', port: 587, secure: false },
  'outlook.com': { host: 'smtp-mail.outlook.com', port: 587, secure: false },
  'yahoo.com': { host: 'smtp.mail.yahoo.com', port: 587, secure: false },
  'icloud.com': { host: 'smtp.mail.me.com', port: 587, secure: false },
  'aol.com': { host: 'smtp.aol.com', port: 587, secure: false },
  'protonmail.com': { host: 'smtp.protonmail.com', port: 587, secure: false },
  'zoho.com': { host: 'smtp.zoho.com', port: 587, secure: false },
  'mail.ru': { host: 'smtp.mail.ru', port: 587, secure: false },
  'yandex.com': { host: 'smtp.yandex.com', port: 587, secure: false },
  'fastmail.com': { host: 'smtp.fastmail.com', port: 587, secure: false }
};

const smtpPatterns = [
  'smtp.{domain}',
  'mail.{domain}',
  'smtp.mail.{domain}',
  'outgoing.{domain}',
  'send.{domain}',
  '{domain}'
];

const portConfigs = [
  { port: 587, secure: false },
  { port: 465, secure: true },
  { port: 25, secure: false }
];

function checkPort(host, port) {
  return new Promise((resolve) => {
    const socket = net.connect(port, host, () => {
      socket.end();
      resolve(true);
    });
    
    socket.setTimeout(3000, () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.on('error', () => resolve(false));
  });
}

async function resolveMX(domain) {
  try {
    const dns = new DNS({ dns: '8.8.8.8' });
    const { answers } = await dns.resolve(domain, 'MX');
    return answers ? answers.sort((a, b) => a.priority - b.priority) : [];
  } catch {
    return [];
  }
}

async function findSMTP(domain) {
  // Try patterns
  for (const pattern of smtpPatterns) {
    const host = pattern.replace('{domain}', domain);
    
    for (const config of portConfigs) {
      const isOpen = await checkPort(host, config.port);
      if (isOpen) {
        return {
          host: host,
          port: config.port,
          secure: config.secure
        };
      }
    }
  }
  
  // Try MX records
  const mxRecords = await resolveMX(domain);
  for (const mx of mxRecords.slice(0, 2)) {
    const host = mx.exchange || mx.name;
    
    for (const config of portConfigs) {
      const isOpen = await checkPort(host, config.port);
      if (isOpen) {
        return {
          host: host,
          port: config.port,
          secure: config.secure
        };
      }
    }
  }
  
  return null;
}

async function getSMTPSettings(email) {
  if (!email || !email.includes('@')) {
    return { error: 'Invalid email' };
  }
  
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) {
    return { error: 'Invalid domain' };
  }
  
  // Check main providers first
  if (mainProviders[domain]) {
    return mainProviders[domain];
  }
  
  // Dynamic discovery
  const result = await findSMTP(domain);
  if (result) {
    return result;
  }
  
  return { error: 'SMTP not found' };
}

module.exports = { getSMTPSettings };