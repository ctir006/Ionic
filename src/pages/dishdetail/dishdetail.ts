import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-dishdetail',
    templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
    dish: Dish;
    errMess: string;
    avgstars: string;
    numcomments: number;
    favorite: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private toastCtrl: ToastController,
        @Inject('BaseURL') private BaseURL,
        private modalCtrl: ModalController,
        private actionCtrl: ActionSheetController,
        private favoriteservice: FavoriteProvider) {
        this.dish = navParams.get('dish');
        this.favorite = this.favoriteservice.isFavorite(this.dish.id);
        this.numcomments = this.dish.comments.length;
        let total = 0;
        this.dish.comments.forEach(comment => total += comment.rating);
        this.avgstars = (total / this.numcomments).toFixed(2);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DishdetailPage');
    }

    addToFavorites() {
        console.log('Adding to Favorites', this.dish.id);
        this.favorite = this.favoriteservice.addFavorite(this.dish.id);
        this.toastCtrl.create({
            message: 'Dish ' + this.dish.id + ' added as favorite successfully',
            position: 'middle',
            duration: 3000
        }).present();
    }
    presentActionSheet() {
        const actionSheet = this.actionCtrl.create({
            title: 'select actions',
            buttons: [
                {
                    text: 'Add to favorites',
                    role: 'primary',
                    handler: () => {
                        console.log('Adding to Favorites', this.dish.id);
                        this.favorite = this.favoriteservice.addFavorite(this.dish.id);
                        this.toastCtrl.create({
                            message: 'Dish ' + this.dish.id + ' added as favorite successfully',
                            position: 'middle',
                            duration: 3000
                        }).present();
                    }
                }, {
                    text: 'Add comment',
                    role: 'primary',
                    handler: () => {
                        let modal = this.modalCtrl.create(CommentPage);
                        modal.onDidDismiss(data => {
                            console.log(data);
                            this.dish.comments.push(data);
                        });
                         modal.present();
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }
}
