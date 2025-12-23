import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { MensagemErroComponent } from "../../componentes/mensagem-erro/mensagem-erro.component";
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    ReactiveFormsModule,
    SeparadorComponent,
    RouterLink,
    MensagemErroComponent,
    CabecalhoComponent
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
      avatar: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl('')
    });
  }

  obterControle(nome: string): FormControl {
    const control = this.contatoForm.get(nome);
    if (!control) {
      throw new Error('Controle de formulário não encontrado: ' + nome);
    }
    // o get retorna um AbstractControl. Precisa converter para FormControl
    return control as FormControl;
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

  aoSelecionarArquivo(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.lerArquivo(file);
    }
  }

  lerArquivo(file: File) {
    const reader = new FileReader();
    reader.onload = () => { // quando o arquivo for carregado
      if (reader.result) { // se o arquivo foi lido com sucesso
        this.contatoForm.get('avatar')?.setValue(reader.result); // seta na propriedade avatar
      }
    }
    reader.readAsDataURL(file); // converte para base64
  }

  cancelar() {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.contatoForm.reset();
    if (id) { // retorna pra lista caso desista de editar
      this.router.navigateByUrl('/lista-contatos');
    }
  }

}
