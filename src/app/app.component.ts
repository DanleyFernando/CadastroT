import { Component } from '@angular/core';
import { CepserviceService } from './cepservice.service';

interface Employee {
  id: number;
  tipopessoa: string;
  codigo: string;
  cpf_cnpj: string;
  email: string;
  endereco: string;
  nome: string;
  nomefantasia: string;
  cep: string;
  telefone: string;
  cidade: string;
  bairro: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './cadastro.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employees: Employee[] = [];
  employee: Employee = {
    id: 0,
    tipopessoa: '',
    cpf_cnpj: '',
    codigo: '',
    email: '',
    endereco: '',
    nome: '',
    nomefantasia: '',
    cep: '',
    telefone: '',
    cidade: '',
    bairro: '',
  };

  showForm: boolean = false;

  constructor(private cepService: CepserviceService) {
    this.loadEmployees();
  }

  saveEmployee() {
    this.employee.id = Date.now();
    this.employees.push({ ...this.employee });
    this.saveToLocalStorage();
    this.resetForm();
  }

  saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  loadEmployees() {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      this.employees = JSON.parse(storedEmployees);
    }
  }

  resetForm() {
    this.employee = {
      id: 0,
      tipopessoa: '',
      cpf_cnpj: '',
      codigo: '',
      email: '',
      endereco: '',
      nome: '',
      nomefantasia: '',
      cep: '',
      telefone: '',
      cidade: '',
      bairro: '',
    };
  }

  buscarEndereco() {
    // Remove caracteres não numéricos do CEP
    const cepSemHifen = this.employee.cep.replace(/[^0-9]/g, '');
  
    if (cepSemHifen.length !== 8) {
      // Limpa os campos se o CEP não for válido
      this.employee.endereco = '';
      this.employee.bairro = '';
      this.employee.cidade = '';
      return;
    }
  
    this.cepService.buscar(cepSemHifen).subscribe(data => {
      console.log('Resposta da API:', data);  // Verifique se os dados estão corretos
      if (data) {
        this.employee.endereco = data.logradouro || '';
        this.employee.bairro = data.bairro || '';
        this.employee.cidade = data.localidade || '';
      } else {
        this.employee.endereco = '';
        this.employee.bairro = '';
        this.employee.cidade = '';
      }
    }, error => {
      console.error('Erro ao buscar o CEP:', error);
      this.employee.endereco = '';
      this.employee.bairro = '';
      this.employee.cidade = '';
    });
  }
  




  toggleForm() {
    this.showForm = !this.showForm;
  }

  clearEmployees() {
    this.employees = [];
    this.saveToLocalStorage();
  }
}
