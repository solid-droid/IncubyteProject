import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../getData/get-data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  words:any = [];
  selectedWords:any;
  inputText = '';
  
  constructor(
    private readonly getData: GetDataService
  ) { }

  ngOnInit(): void {
    this.getData.getAllWords();
    this.getData.getWordList.subscribe(list => {
      this.words = list.map((x:any) => ({...x, edit: false}));
    });

  }

  addWord(){
    if(this.inputText.trim()!== ''){
      this.getData.addWord(this.inputText);
    }
  
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
