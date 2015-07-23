// loql.js
// A simple interface to javascript localStorage

loql = {

	create: function(table){
		if(!localStorage.getItem(table)){
			localStorage.setItem(table, JSON.parse('[]'));
		}
	},
	
	insert: function(table, value){
		
		var targetIndex = JSON.parse(localStorage.getItem(table));
		if(!targetIndex){
			this.create(table);
			targetIndex = JSON.parse('[]');
			newID = 0;
		} else {
			newID = targetIndex[targetIndex.length - 1];
			newID = newID+1;
		}
		
		targetIndex[targetIndex.length] = newID;
		
		localStorage.setItem(table, JSON.stringify(targetIndex));
		localStorage.setItem(table+'-'+newID, JSON.stringify(value));
		
		return newID.toString();
	},
	
	set: function(table, id, value){
		if(!id){
			return false;
		} else {
			localStorage.setItem(table+'-'+id, JSON.stringify(value));
			return true;
		}
	},
	
	select: function(table, id){
		if(id != null){
			return JSON.parse(localStorage.getItem(table+'-'+id));
		} else {
			return JSON.parse(localStorage.getItem(table));
		}	
	},
	
	del: function(table,id){
		targetIndex = JSON.parse(localStorage.getItem(table));
		newIndex = JSON.parse('[]');
		
		i = 0;
		for(var k in targetIndex){
			if(targetIndex[k] != id){
				newIndex[i] = targetIndex[k];
				i++;
			}
		}
		
		localStorage.setItem(table, JSON.stringify(newIndex));
		localStorage.removeItem(table+'-'+id);
	},
	
	drop: function(table){
		var records = this.select(table);
		if(records){
			for(i=0;i<records.length;i++){
				localStorage.removeItem(table+'-'+records[i]);
			}
		}
		localStorage.removeItem(table);
	},

}
