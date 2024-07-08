import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent {
  @Input() showModal: boolean = false;
  @Input() modalTitle: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    this.closeModal.emit();
  }


  onModalClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('custom-modal')) {
      this.closeModal.emit();
    }
  }

  onContentClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
