import Api from '../util/api'


const PAGE_SIZE = 20;

export default class FollowedByUserData {
    
    page: 1;
    list: [];

    async refresh(loadMore = false) {
        let page = !loadMore ? 1 : this.page + 1;
        let data = await Api.getRelationReverseUsers(page, PAGE_SIZE)
        let more = data.users.length === PAGE_SIZE;

        if(!loadMore) {
            this.page = page;
            this.list = data.users.slice(0, PAGE_SIZE - 1);

        } else if(data.users.length > 0) {
            this.page = page;
            this.list = this.list.concat(data.users.slice(0, PAGE_SIZE - 1));
        }

        return {
            list: this.list,
            more
        };
    }
}