import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  words:any = [];
  selectedWords:any;
  inputText = '';
  
  constructor() { }

  ngOnInit(): void {

    this.words = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
  ];

  }

  addWord(){
  }

  editWord(word:any){

  }

  deleteWord(word:any){

  }
}
