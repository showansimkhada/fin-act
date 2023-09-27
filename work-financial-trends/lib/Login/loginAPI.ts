export async function fetchLogCred(username = '', password = ''): Promise<{ data: string }> {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    const result = await response.json()
  
    return result
  }
  