import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ASIDE_SALADS, INGREDIENTS, SWEET_INGREDIENTS} from "../custom-crepe/custom-crepe.form";
import {CustomGalette} from "../menu.component";

@Component({
  selector: 'sfo-crepe-preview',
  standalone: true,
  imports: [],
  templateUrl: './crepe-preview.component.html',
  styleUrl: './crepe-preview.component.scss'
})
export class CrepePreviewComponent {
    protected readonly SWEET_INGREDIENTS = SWEET_INGREDIENTS;
    protected readonly ASIDE_SALADS = ASIDE_SALADS;
    protected readonly INGREDIENTS = INGREDIENTS;

    @Input() crepe!: CustomGalette;
    @Input() edit?: boolean = false;

    @Output() onEdit = new EventEmitter();
}
