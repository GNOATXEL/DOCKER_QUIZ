import {Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiHelperService} from "../../services/api-helper.service";

@Component({
  selector: 'app-idol',
  templateUrl: './idol.component.html',
  styleUrl: './idol.component.scss'
})

export class IdolComponent {

  constructor(private http: HttpClient, private router: Router, private api: ApiHelperService,
              private el: ElementRef, private renderer: Renderer2) {
  }

  dataSource: any[] = [];
  dataSourcent: any[] = [];
  nameSuggestions: any[] = [];
  showSuggestions: boolean = false;
  inputValue: string = '';
  answerValue: string = '';
  result: string = '';
  isStartClicked: boolean = false;
  isNextClicked: boolean = true;
  skippable: boolean = true;
  starting: boolean = true;
  shiftenter: boolean = true;
  guesses: number = 0;
  total: number = 0;
  skipped: boolean = false;
  rightAnswer: string = "";
  group: string = "";
  status: number = 0;
  songPool: any[] = [];
  YT: any;
  @ViewChild('inputField') inputField!: ElementRef;

  ngOnInit(): void {
    const request: Observable<any> = this.http.get(
      'http://localhost:3000/song',
      {observe: 'response'},
    );
    request.subscribe({
      next: (response) => (this.dataSourcent = response.body, console.log(this.dataSourcent)),
    });

  }

  start(): void {
    this.starting = true;
    this.isStartClicked = true;
    this.isNextClicked = true;
    this.skippable = false;
    const request: Observable<any> = this.http.put(
      'http://localhost:3000/song/roll/' + this.status,
      {observe: 'response'},
    );

    request.subscribe({
      next: (response) => {
        this.dataSource = [response];
        //console.log(this.dataSource[0]);

        let newVideoUrl = this.dataSource[0].link;

        const time = Math.floor(Math.random() * (this.dataSource[0].end - this.dataSource[0].start + 1) + this.dataSource[0].start);
        console.log(time);
        newVideoUrl += `?autoplay=true&start=${time}`;


        const videoFrame = document.getElementById('videoFrame') as HTMLVideoElement;
        videoFrame.src = newVideoUrl;
        let seconds = 20;
        videoFrame.classList.add('hidden');

        seconds += 2;

        const countdownTimer = document.getElementById('countdownTimer') as HTMLParagraphElement;
        countdownTimer.style.display = 'block';
        countdownTimer.textContent = `Loading...`;
        let self = this;
        videoFrame.onload = function () {
          countdownTimer.textContent = `Loaded!`;
          self.inputField.nativeElement.focus();
          self.skipped = false;
          const timerInterval = setInterval(() => {
            seconds--;
            self.shiftenter = true;
            if (seconds !== 0) {
              countdownTimer.textContent = `${seconds - 1}`;
            }
            if (seconds === 0 || self.skipped) {

              setTimeout(() => {
                clearInterval(timerInterval);
                countdownTimer.textContent = ``;
                videoFrame.classList.remove('hidden');
                countdownTimer.style.display = 'none';

                self.isNextClicked = false;
                self.skippable = true;
                self.rightAnswer = self.dataSource[0].name;
                self.group = self.dataSource[0].group.trim();
                if (self.answerValue.toLowerCase() === self.dataSource[0].name.toLowerCase().replace(/・/g, ' ') ||
                  self.inputValue.toLowerCase() === self.dataSource[0].name.toLowerCase().replace(/・/g, ' ')) {
                  self.result = "correct";
                  self.guesses += 1;
                  self.total += 1;
                  self.shiftenter = true;
                } else {
                  self.result = "wrong";
                  self.total += 1;
                  self.shiftenter = true;
                }
              }, 100);

            }
            ; // Actualise toutes les secondes
          }, 1000)
        };
        this.result = "";
        this.answerValue = "";
        this.inputValue = '';
        this.starting = false;


      }
    });
  }

  answer(): void {
    this.answerValue = this.inputValue;

  }

  skip(): void {
    this.skipped = true;
  }

  suggestNames(): void {
    this.nameSuggestions = this.dataSourcent.filter((obj) =>
      (obj.name.toLowerCase().replace(/・/g, ' ')).includes(this.inputValue.toLowerCase())
    ).slice(0, 5); // Limitez à 5 suggestions
    this.showSuggestions = this.nameSuggestions.length > 0;
    console.log(this.nameSuggestions);
    console.log(this.dataSourcent);
  }


  writeSuggestion(suggestion: string) {
    this.inputValue = suggestion;
    this.showSuggestions = false;
    this.answer();
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Vérifier si la touche appuyée est "Enter" et si la touche Shift est également enfoncée
    if (event.key === 'Enter' && event.shiftKey && !this.skipped && this.shiftenter) {
      this.shiftenter = false;
      const button = this.el.nativeElement.querySelector('#skip');
      if (button) {
        button.click();
      }
    }
    // else if (event.key === 'Enter' && event.shiftKey && !this.starting && this.shiftenter) {
    //    this.shiftenter=false;
    //   const button = this.el.nativeElement.querySelector('#next');
    //   if (button) {
    //     button.click();
    //   }
    //  }
    // casse des trucs jsp pk à mon avis c trop lent
  }

  activeButton: number = 0; // Initialisation à zéro


  updateStatus(nb: number): void {

    const nogi = document.getElementById('nogi') as HTMLButtonElement ;
    const saku = document.getElementById('saku') as HTMLButtonElement ;
    const hina = document.getElementById('hina') as HTMLButtonElement ;
    const keya = document.getElementById('keya') as HTMLButtonElement ;
    if (nb === 1) {
      if (this.status % 10 === 0) {
        this.status += nb
        nogi.classList.add('active');

      } else if (this.status % 10 === 1) {
        this.status -= nb
        nogi.classList.remove('active');
      }
    } else if (nb === 10) {
      if (Math.floor(this.status / nb) % 10 === 0) {
        this.status += nb
        saku.classList.add('actives');
      } else if (Math.floor(this.status / nb) % 10) {
        this.status -= nb
        saku.classList.remove('actives');
      }
    } else if (nb === 100) {
      if (Math.floor(this.status / nb) % 10 === 0) {
        this.status += nb
        hina.classList.add('active');
      } else if (Math.floor(this.status / nb) % 10) {
        this.status -= nb
        hina.classList.remove('active');
      }
    } else if (nb === 1000) {
      if (Math.floor(this.status / nb) % 10 === 0) {
        this.status += nb
        keya.classList.add('active');
      } else if (Math.floor(this.status / nb) % 10) {
        this.status -= nb
        keya.classList.remove('active');
      }
    }
    console.log(this.status)

  }
}
