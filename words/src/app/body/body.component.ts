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
  editingWord = '';
  
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
    this.editingWord = word.word;
  }

  async update(word:any){
    await this.getData.updateWord({word: this.editingWord, _id: word._id});
    word.edit = false;
  }

  deleteWord(word:any){
    this.getData.deleteWord(word);
  }
}
