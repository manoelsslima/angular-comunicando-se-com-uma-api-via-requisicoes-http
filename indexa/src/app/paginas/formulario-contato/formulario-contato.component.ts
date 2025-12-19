import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    ReactiveFormsModule,
    SeparadorComponent,
    RouterLink
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})
export class FormularioContatoComponent implements OnInit {

  contatoForm!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarContato();
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl('')
    });
  }

  carregarContato() {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.buscarPorId(parseInt(id)).subscribe((contato) => {
        // patchValue -> popula o formulário com o valor passado
        this.contatoForm.patchValue(contato);
      });
    }
  }

  salvarContato() {
    const novoContato = this.contatoForm.value;
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    // se o contato existir, converte para inteiro
    novoContato.id = id ? parseInt(id) : null;

    this.contatoService.editarOuSalvarContato(novoContato).subscribe(() => {
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos');
    });
  }

  cancelar() {
    this.contatoForm.reset();
  }

}
