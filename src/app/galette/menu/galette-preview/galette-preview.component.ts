import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ASIDE_SALADS, INGREDIENTS, SWEET_INGREDIENTS} from "../galette-creative/galette-creative.form";
import {CustomGalette} from "../menu.component";

@Component({
  selector: 'sfo-galette-preview',
  standalone: true,
  imports: [],
  templateUrl: './galette-preview.component.html',
  styleUrl: './galette-preview.component.scss'
})
export class GalettePreviewComponent {
    protected readonly SWEET_INGREDIENTS = SWEET_INGREDIENTS;
    protected readonly ASIDE_SALADS = ASIDE_SALADS;
    protected readonly INGREDIENTS = INGREDIENTS;

    @Input() crepe!: CustomGalette;
    @Input() edit?: boolean = false;

    @Output() onEdit = new EventEmitter();
}
