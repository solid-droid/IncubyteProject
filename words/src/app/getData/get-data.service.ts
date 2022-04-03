import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

commonUrl = 'http://localhost:9000/.netlify/functions/api/';

  constructor() { }

  private readonly Obs_wordList = new BehaviorSubject([]);
  getWordList = this.Obs_wordList.asObservable();

  private setWordList(wordList:any) {
    this.Obs_wordList.next(wordList);
  }

  async getAllWords() {
    const data = await(await fetch(this.commonUrl+ 'getAllWords')).json();
    this.setWordList(data);
  }

  async updateWord(word:any) {
    const data = await(await fetch(this.commonUrl+ 'updateWord/'+word._id+'/'+word.word,{
      method: 'PUT',
    })).json();
    this.getAllWords();
  }

  async addWord(word:any) {
    const data = await(await fetch(this.commonUrl+ 'addNewWord/'+word,{
      method: 'POST',
    })).json();
    this.getAllWords();
  }

  async deleteWord(word:any) {
    const data = await(await fetch(this.commonUrl+ 'deleteWord/'+word._id,{
      method: 'DELETE',
    })).json();
    this.getAllWords();
  }
}
