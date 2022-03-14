
input displace = 0;
input length = 60;
input price = close;
def LinReg = LinearRegCurve(displace, length, price);
def LinDis = ((price - LinReg) / (price));
plot LinDi = LinDis;

#Extras
input LinType = AverageType.EXPONENTIAL;
#def LINMA = MovingAverage(LinType, LinDis, 14);
#plot LINMA1 = LINMA;
#AddLabel(yes, LinDis + "%");
#def zeroline =0;
#plot data = zeroline;

    

