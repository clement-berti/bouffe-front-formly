import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  selector: 'sfo-debug-switch',
  standalone: true,
  imports: [
    MatSlideToggle
  ],
  templateUrl: './debug-switch.component.html',
  styleUrl: './debug-switch.component.scss'
})
export class DebugSwitchComponent implements AfterViewInit{
  @Input() debug: boolean = false;
  @Output() onChange = new EventEmitter();

  @ViewChild('debugModeSwitch', { read: ElementRef }) element: ElementRef | undefined;

  private debugSvg = 'M480-200q66 0 113-47t47-113v-160q0-66-47-113t-113-47q-66 0-113 47t-47 113v160q0 66 47 113t113 47Zm-80-120h160v-80H400v80Zm0-160h160v-80H400v80Zm80 40Zm0 320q-65 0-120.5-32T272-240H160v-80h84q-3-20-3.5-40t-.5-40h-80v-80h80q0-20 .5-40t3.5-40h-84v-80h112q14-23 31.5-43t40.5-35l-64-66 56-56 86 86q28-9 57-9t57 9l88-86 56 56-66 66q23 15 41.5 34.5T688-640h112v80h-84q3 20 3.5 40t.5 40h80v80h-80q0 20-.5 40t-3.5 40h84v80H688q-32 56-87.5 88T480-120Z'
  private summarySvg ='M229-144q-24.26 0-43.13-14T160-195L45-578q-5-17.14 5.79-31.57T80-624h221l140-219q7-11 18-16t22-5q11 0 21.5 5t17.5 16l139 219h221q18.42 0 29.21 14.43T915-578L800-195q-7 23-25.87 37T731-144H229Zm0-72h502l101-336H128l101 336Zm251.21-96Q510-312 531-333.21t21-51Q552-414 530.79-435t-51-21Q450-456 429-434.79t-21 51Q408-354 429.21-333t51 21ZM386-624h188l-94-147-94 147Zm94 240Z'

  public ngAfterViewInit() {
    if (this.element){
      this.element.nativeElement.querySelector('.mdc-switch__icon--on').firstChild.setAttribute('d', this.debugSvg);
      this.element.nativeElement.querySelector('.mdc-switch__icon--off').firstChild.setAttribute('d', this.summarySvg)
      this.element.nativeElement.querySelector('.mdc-switch__icon--on').setAttribute('viewBox', "0 -960 960 960");
      this.element.nativeElement.querySelector('.mdc-switch__icon--off').setAttribute('viewBox', "0 -960 960 960");
    }
  }

  public switch() {
    this.onChange.emit(!this.debug);
  }
}
