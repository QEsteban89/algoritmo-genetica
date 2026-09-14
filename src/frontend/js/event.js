export function printLog(message, type = 'info') {
    const logContainer = document.getElementById('log-output');
    
    if (!logContainer)
        return;

    const entry = document.createElement('p');
    entry.className = `log-${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logContainer.appendChild(entry);
    logContainer.scrollTop = logContainer.scrollHeight;
}
