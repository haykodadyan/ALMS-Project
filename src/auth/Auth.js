class AuthService {
    static isAuthenticated = JSON.parse(localStorage.getItem('auth_state'));
    static async _authFunction(url, data){
        try{
            const resp = await fetch(`http://localhost:9999/api/auth/${url}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!resp.ok) {
                throw new Error(`Error in ${url} endpoint.`);
            }
            const userData = await resp.json()
            localStorage.setItem('token', userData.token)
            localStorage.setItem('auth_state', JSON.stringify(true))
            this.isAuthenticated = true;
            return userData
        }catch (e){
            console.log('Error in authentication')
        }
    }
    static async registration({email, password, role, name}){
        return this._authFunction('registration', {email, password, role, name})
    }
    static async login(email, password) {
        return this._authFunction('login', {email, password})
    }

    static logout() {
        localStorage.removeItem('auth_state')
        localStorage.removeItem('token')
        this.isAuthenticated = false;
    }

    static getIsAuthenticated() {
        return this.isAuthenticated;
    }
}

export default AuthService;
