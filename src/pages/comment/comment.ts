import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Dish } from '../../shared/dish';


/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
    comment: FormGroup;
    brightness: number = 20;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private formBuilder: FormBuilder,
        private viewCtrl: ViewController) {

        this.comment = this.formBuilder.group({
            rating: 3,
            author: ['', Validators.required],
            comment: ['', Validators.required]
        });
  }

    onSubmit() {
        console.log(this.comment.value);
        this.dismiss();
    }

    dismiss() {
        let data = this.comment.value;
        let date = new Date();
        data['date'] = date.toISOString();
        this.viewCtrl.dismiss(data);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

}
