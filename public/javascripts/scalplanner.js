scal.addMethods({
/*------------------------------- INTERNAL -------------------------------*/    
    _setupPlanner: function(planner) {
        this.planner = {};		
        this._eventIndex = {deleted: []};
        planner.each(function(plan) {
            this._setPlanner(plan);	
        }.bind(this));
    },
	_setPlanner: function(plan) {
        var plannerPeriod = Object.isArray(plan.period) ? plan.period : (typeof plan.period) == 'object' ? [plan.period] : [new Date(plan.period)];		
        plannerPeriod.each(function(planDate){
            if(!this.planner[planDate]) { this.planner[planDate] = []; }		
            if(Object.isString(plan.cls) && Object.isString(plan.label)){
                this.planner[planDate].push({ cls: ['dayboxevent', plan.cls], val: plan.label });
                this._updateEindex(plan.label, planDate);
            } else {
                var cls = Object.isArray(plan.cls) ? plan.cls : [plan.cls];
                var labels = Object.isArray(plan.label) ? plan.label : [plan.label];			
                while(cls.size() > labels.size()) {
                    labels.push(labels[0]);				
                    } 
                while(labels.size() > cls.size()) {			
                    cls.push(cls[0]);	
                }			
                $A($R(0, cls.size() - 1)).each(function(v){			
                    var label = labels.size() > 1 ? labels.shift() : labels[0];
                    this.planner[planDate].push({cls: ['dayboxevent', cls.shift()], val: label});
                    this._updateEindex(label, planDate);
                }.bind(this));			
            }
       }.bind(this));		
    },
    _updateEindex: function(val,dt) {
        if(!this._eventIndex[val]) { this._eventIndex[val] = []; }
        this._eventIndex[val].push(dt);
    },
    _updatePlanner: function(day, el) {
        el.innerHTML = '';
        if(this.planner[day]) {
            this.planner[day].each(function(plan) {	
                plan.cls.push('dayboxevent');
                el.insert(new Element('p',{'class': plan.cls.join(' ') }).update(plan.val));
            });
        }
    },
    _compareMonthYear: function(date1,date2) {
        return Object.isUndefined(['getMonth','getFullYear'].find(function(n){ return date1[n]() != date2[n](); }));
    },
/*------------------------------- PUBLIC -------------------------------*/        
    getDatesByEvent: function(evt) {
        var dates = [];
        if(this._eventIndex[evt]){
            this._eventIndex[evt].each(function(d){
                this._eventIndex.deleted = this._eventIndex.deleted.without(d);
                dates.push(d);
            }.bind(this));
            return dates;
        }
        return false;
    },
    getEventsByDate: function(d) {
        var pevents = [];
        if(this.planner[d]) {
            this.planner[d].each(function(p){
                pevents.push(p.val);
            });
            return pevents;
        }
        return false;
    },
    getCurrentEvents: function() {
        // determine if we want just the current month or everything in current calendar view
        var currentMonth = arguments[0] ? this.currentdate.getMonth() : false;
        var plannerCheck = function(d) {
            if(currentMonth) { return this.planner[d] && (d.getMonth() == currentMonth) ? true : false; }
            else { return this.planner[d] ? true : false; }
        }.bind(this);
        var evts = [];
        this.dateRange.each(function(d,i) {
            if(plannerCheck(d)) {
                evts.push({dt: d, target: this.cells[i]});
            }
        }.bind(this));
        return evts;
    },
    removeEventsByDate: function(d) {
        if(this.planner[d]) {
            var cellIndex = this._getCellIndexByDate(d);
            if(Object.isNumber(arguments[1])) {
                var index = arguments[1];
                if(this.planner[d][index]){
                    delete this._eventIndex[this.planner[d][index]['val']];
                    this.planner[d].splice(index,1);
                }
                this.cells[cellIndex].select('.dayboxvalue p')[index].remove();
             } else {
                delete this.planner[d];
                this._eventIndex.deleted.push(d);
                this.cells[cellIndex].select('.dayboxvalue').invoke('remove');
             }
        } else {
            return false;
        }
    },
    getEventElementsByDate: function(d) {
        return this.getElementByDate(d).select('p.dayboxevent');
    },
    getEventElementsByWeek: function(week) {
        return this.getElementsByWeek(week).collect(function(e){ return e.select('p.dayboxevent'); });
    },
    getSelectedEvents: function() {
        var selectedElement = this.getSelectedElement();
        return Object.isUndefined(selectedElement) ? false : selectedElement.select('p.dayboxevent');
    },
    getTodaysEvents: function() {
        return this.getTodaysElement().select('p.dayboxevent');
    },
    updateDayValue: function(week,day,value){
        var planvalues = Object.isArray(value) ? value : [value]; 
        var planclasses = arguments[3] ? Object.isString(arguments[3]) ? [arguments[3]] : arguments[3] : [];
        week -= 1;
        day -= 1;
        this.dateRange.eachSlice(7, function(wk,i) {
            if(i == week) {
                this._setPlanner({period: wk[day], cls: planclasses.clone(), label: planvalues.clone()});
                throw $break
            }
        }.bind(this));        
        planclasses.push('dayboxevent');
        var cellvalue = '.cal_day_'+week+'_'+day+'_value';
        var el = this.element.select(cellvalue)[0];
        planvalues.each(function(val) {
            el.insert(new Element('p',{'class': planclasses.join(' ')}).update(value));
        });
        return el;
    },
    setPlannerValue: function(year,month,day,value){
        var planvalues = Object.isArray(value) ? value : [value];
        var plannerdate = new Date();
        plannerdate.setHours(0,0,0,0);
        plannerdate.setYear(year);
        plannerdate.setMonth(month-1,1);
        plannerdate.setDate(day);
        var planclasses = arguments[4] ? Object.isString(arguments[4]) ? [arguments[4]] : arguments[4] : [];
        this._setPlanner({period: plannerdate, cls: planclasses.clone(), label: planvalues.clone()});
        planclasses.push('dayboxevent');
        if(this.dateRange.first() > plannerdate || this.dateRange.last() < plannerdate){
            return; // return nothing if plannerdate isn't in the current month
        }
        var cellIndex = this._getCellIndexByDate(plannerdate);
        var el = this.cells[cellIndex].select('.dayboxvalue')[0];
        planvalues.each(function(val) {
            el.insert(new Element('p',{'class': planclasses.join(' ')}).update(val));
        });
        return el;
    }
});
