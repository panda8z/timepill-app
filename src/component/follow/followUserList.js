import React, {Component} from 'react';
import {StyleSheet, Text, View, InteractionManager, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Touchable from '../touchable';
import Color from '../../style/color';

import UserIcon from '../userIcon';
import ListFooter from '../listFooter';


export default class FollowUserList extends Component {

    constructor(props) {
        super(props);

        this.dataSource = props.dataSource;
        this.listType = props.listType || 'undefined';

        this.state = {
            users: [],

            refreshing: false,
            refreshFailed: false,

            hasMore: true,
            loadingMore: false,
            loadFailed: false
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.refresh();
        });
    }

    refresh() {
        if (this.state.refreshing) {
            return;
        }

        this.setState({refreshing: true, refreshFailed: false});
        this.dataSource.refresh()
                .then(result => {
                    if(!result) {
                        throw {
                            message: 'refresh ' + this.listType + ' no result'
                        }

                    } else {
                        console.log('refresh ' + this.listType + ' result:', result);

                        this.setState({
                            users: result.list ? result.list : [],
                            refreshFailed: false
                        });
                    }

                }).catch(e => {
                    this.setState({
                        refreshFailed: true
                    });

                }).done(() => {
                    this.setState({
                        refreshing: false
                    });
                });
    }

    loadMore() {
        if (this.state.loadingMore) {
            return;
        }

        this.setState({loadingMore: true, loadFailed: false});
        this.dataSource.refresh(true)
                .then(result => {
                    if(!result) {
                        throw {
                            message: 'refresh ' + this.listType + ' no result'
                        }

                    } else {
                        console.log('refresh ' + this.listType + ' result:', result);

                        this.setState({
                            users: result.list ? result.list : [],
                            hasMore: result.more,
                            loadFailed: false
                        });
                    }

                }).catch(e => {
                    this.setState({
                        hasMore: false,
                        loadFailed: true
                    });

                }).done(() => {
                    this.setState({
                        loadingMore: false
                    });
                });
    }

    render() {
        return (
            <View style={localStyle.container}>
                <FlatList style={localStyle.list}

                    data={this.state.users}

                    keyExtractor={(item, index) => {
                        return item.id ? item.id.toString() : index;
                    }}

                    renderItem={({item}) => {
                        return (
                          <Touchable key={item.id} onPress={() => {}}>
                            <View style={localStyle.box}>
                                <UserIcon iconUrl={item.iconUrl}></UserIcon>
                                <Text style={localStyle.userName}>{item.name}</Text>
                                <Touchable onPress={() => {}}>
                                    <Ionicons name="md-close" size={20}
                                        style={localStyle.removeIcon}
                                        color={Color.inactiveText} />
                                </Touchable>
                            </View>
                          </Touchable>
                        );
                    }}

                    ListFooterComponent={() => {
                        if (this.state.refreshing || this.state.loadingMore || this.state.users.length == 0) {
                            return null;
                        }

                        if (this.state.loadFailed) {
                            return ListFooter.renderFooterFailed(this.loadMore.bind(this));
                        }

                        if (!this.state.hasMore) {
                            return ListFooter.renderFooterEnd();
                        }

                        return ListFooter.renderFooterLoading();
                    }}

                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh.bind(this)}

                    onEndReachedThreshold={2}
                    onEndReached={this.state.hasMore ? this.loadMore.bind(this) : null}
                />
            </View>
        );
    }
}

const localStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        height: '100%'
    },
    box: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: Color.line,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 25
    },
    userName: {
        flex: 1,
        color: Color.text,
        fontSize: 16
    },
    removeIcon: {
        padding: 20
    }
});
