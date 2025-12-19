import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

  @Input() id?: number;
  @Input() nome: string = '';
  @Input() avatar: string | ArrayBuffer = '';
  @Input() telefone: string = '';
}
