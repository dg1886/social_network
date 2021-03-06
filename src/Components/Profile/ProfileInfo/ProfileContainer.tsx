import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getUserProfile, getStatus, updateStatus, savePhoto} from "../../../redux/profile-reducer";
import {rootAppStateType} from "../../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";


type Own = {}

type MatchParamsType = {
    userId: string   // string
}

type MapDispatchType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void  //
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
}
type MapPropsType = ReturnType<typeof mapStateToProps>
// type MapStateToPropsType = {
//     posts: Array<PostType>
//
//     profile: ProfileType | null
//     status: string
//     authorizedUserId: number | null
//     // isAuth: boolean
// }
// type ProfileContainerPropsType = {
//     // setUserProfileActionCreator: (profile: Array<ProfileType>) => void
//     getUserProfile: (userId: number) => void
// }
type PropsType = RouteComponentProps<MatchParamsType> & MapPropsType & MapDispatchType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                //если userId не оказалось и после присвоения -
                // редиректит на login(у this.props есть метод history -
                // можем запушить новый path)
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(Number(userId))
        this.props.getStatus(Number(userId))
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, PrevState: PropsType) {
        if (+this.props.match.params.userId !== +prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }


    render() {
        // if(this.props.isAuth === false) return <Redirect to = {'/login'}/>

        return (
            <Profile {...this.props}
                     isOwner={!+this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
            />
        )
    }
}


let mapStateToProps = (state: rootAppStateType) => ({
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,

    // isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect<MapPropsType, MapDispatchType, Own, rootAppStateType>(mapStateToProps,
        {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
    // withAuthRedirect  //редиректит на Login
)(ProfileContainer)


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
//
// export default connect<MapStateToPropsType, MapDispatchType, Own, rootAppStateType>(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)


// type UsersContactsType = {
//     github: string
//     vk: string
//     facebook: string
//     instagram: string
//     twitter: string
//     website: string
//     youtube: string
//     mainLink: string
// }
// type ProfileType = {
//     is: number
//     lookingForAJob: boolean
//     lookingForAJobDescription: string
//     fullName: string
//     contacts: Array<UsersContactsType>
//     photos: any
// }







