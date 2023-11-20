import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login.model';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiUrl = 'http://localhost:3000/branch'; // Reemplaza con la URL de tu servidor Express

	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	// Método para enviar una nueva rama al servidor
	setEmployeeUser(user: any) {
		return localStorage.setItem('user', JSON.stringify(user));
	}

	getEmployeeUser() {
		return JSON.parse(localStorage.getItem('user'));
	}

	logout(){
		localStorage.removeItem('user');
	}
}