import { ContatoService } from './../../services/contato.service';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../componentes/container/container.component';
import { Contato } from '../../componentes/contato/contato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeparadorComponent } from "../../componentes/separador/separador.component";

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [
    ContainerComponent,
    RouterLink,
    SeparadorComponent,
    SeparadorComponent
],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css'
})
export class PerfilContatoComponent implements OnInit {

  contato: Contato = {
    id: 0,
    nome: '',
    avatar: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // activatedRoute -> Rota Ativa
    // snapshot -> Foto do momento
    // paramMap -> Mapa de Parâmetros
    // get('id') -> Pega o valor do parâmetro 'id'
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.buscarPorId(parseInt(id)).subscribe((contat) => {
        this.contato = contat;
      });
    }
  }

  excluirContato(): void {
      //const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.contato.id) {
        this.contatoService.excluirContato(this.contato.id).subscribe(() => {
          this.router.navigateByUrl('/lista-contatos');
        });
      }
    }
}
