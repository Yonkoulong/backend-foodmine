import { Inject, Injectable } from '@nestjs/common';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class TodoListService {
    private firestore: Firestore;

    constructor(@Inject('FIREBASE_ADMIN') private firebaseAdmin: any) {
        this.firestore = getFirestore(firebaseAdmin);
    }

    //create a new todo
    // async createTodo(title;)
}
