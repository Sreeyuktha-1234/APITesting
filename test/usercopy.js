import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/');
const Token = '684fa62bee1101177afa2c9458a5e58d3fdb0f6b7bae244b04c15c66cbcb24b0';

import { expect } from 'chai';

describe('Users', () => {
    let userId;
    describe('POST', () => {
        it('/users', () => {
            const data = {
                email: `tej66-${Math.floor(Math.random() * 9999)}@mail.com`,
                name: 'Teja',
                gender: 'male',
                status: 'active',
            };
            request
                .post('users')
                .set("Authorization", `Bearer ${Token}`)
                .send(data)
                .then((res) => {
                    // console.log(res.body);
                    expect(res.body).to.deep.include(data);
                    userId = res.body.id;
                    console.log(userId);
                });
        });
    });
    
    describe('GET', () => {
        it('GET/users', (done) => {
            request.get(`users?access-token=${Token}`).end((err, res) => {
                expect(res.body.data);
                done();
            });
        });
        it('GET/users/:id', (done) => {
            request.get(`users/${userId}?access-token=${Token}`).end((err, res) => {
                expect(res.body.id).to.be.eq(userId);
                console.log(res.body.id);
                done();
            });
        });
        it('GET/users/ with query params', (done) => {
            const url = `users?access-token=${Token}&page=5&gender=female&status=active`;
            request.get(url).end((err, res) => {
                expect(res.body).to.not.be.empty;
                res.body.forEach(data => {
                    expect(data.gender).to.be.eql('female');
                    expect(data.status).to.be.eql('active');
                });
                done();
            });
        });
    });
    
    describe('PUT', () => {
        it('/users', () => {
            const data = {
                status: "active",
                name: "Lusy"
            }
            return request
                .put(`users/${userId}`)
                .set('Authorization', `Bearer ${Token}`)
                .send(data)
                .then((res) => {
                    // console.log(res.body);
                    expect(res.body).to.deep.include(data);
                });
        });
    });
    
    describe('DELETE', () => {
        it('/users', () => {
            return request
                .delete(`users/${userId}`)
                .set('Authorization', `Bearer ${Token}`)
                .then((res) => {
                    // console.log(res.body);
                    expect(res.body).to.be.empty;
                });
        });
    });
});