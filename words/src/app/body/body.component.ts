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
      {name: 'Australia', edit: false},
      {name: 'Brazil', edit: false},
  ];

  }

  addWord(){
  }

  editWord(word:any){
    this.words.forEach((item:any) => item.edit = false);
    word.edit = true;
  }

  update(word:any){
    word.edit = false;
    console.log(word);
  }

  deleteWord(word:any){

  }
}
