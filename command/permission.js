const WILDCARD = "*";

exports.Permission = function(users={}, roles={}){
  var me = this;
  
  me.users = users;  
  me.roles = roles;

  me.memberHasPermission = function(member){
    var id = member.id;
    var roles = member.roles;

    if (users == WILDCARD){
      return true;
    }

    if (me.users[id]){
      return true;
    } 

    for (roleId in roles){
      if (me.roles[roleId]){
        return true;
      }
    }
     
    return false;
  }

  return me;
}
