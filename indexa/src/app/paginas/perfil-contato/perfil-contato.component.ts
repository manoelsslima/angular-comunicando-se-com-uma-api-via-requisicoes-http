import { Component } from '@angular/core';
import { ContainerComponent } from '../../componentes/container/container.component';
import { Contato } from '../../componentes/contato/contato';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css'
})
export class PerfilContatoComponent {

  contato: Contato = {
    id: 1,
    nome: 'Manoel',
    telefone: '11999999999',
    email: 'manoel@email.com',
    aniversario: '01/01/1990',
    redes: 'dev.com'
  }
}
